import crypto from "crypto";
import { User } from "../models/User.js";
import { 
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  verifyAccessToken,
  verifyRefreshToken,

 } from "../utils/jwt.utils.js";
 import {
  
  sendVerificationEmail,
  sendPasswordResetEmail,

 } from "../utils/email.utils.js";

export const register = async(req, res)=>{
  try{
    const { name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(409).json({
        message: "Email already in use"
      });
    }

    const user = await User.create({name, email, password});

    const veificationToken = user.generateEmailVerificationToken();
    await user.save();

    await sendVerificationEmail(email, veificationToken);

    res.status(201).json({
      message: "User registered successfully. Please check your email for verification."
    });

  }catch(error){
    console.log("❌",error);
    res.status(500).json({
      message:error.message
    })
  }
};

export const verifyEmail = async(req, res)=>{
  try{
    const {token} = req.query;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() }
    });
    
    if(!user){
      return res.status(400).json({
        message: "Invalid or expired verification token"
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verified successfully. You can now login."
    });

  }catch(error){
    console.log("❌",error);
    res.status(500).json({
      message:error.message
    })
  }
}

export const login = async(req, res)=>{
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    if(!user.isEmailVerified){
      return res.status(403).json({
        message: "Email not verified. Please verify your email to login."
      });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to DB (needed for logout + token rotation)
    user.refreshToken = refreshToken;
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      accessToken,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  }catch(error){
    console.log("❌",error);
    res.status(500).json({
      message:error.message
    })
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(204).send();
    await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
    clearRefreshTokenCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save();
    setRefreshTokenCookie(res, newRefreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
    }
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    await sendPasswordResetEmail(email, resetToken);
    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: 'Password reset successfully. Please login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}/oauth-success?token=${accessToken}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}/login?error=oauth_failed`);
  }
};

