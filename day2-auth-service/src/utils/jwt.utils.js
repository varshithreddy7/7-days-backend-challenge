import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, role)=>{
  return jwt.sign(
    {id: userId, role},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  );
};

export const generateRefreshToken = (userId)=>{
  return jwt.sign(
    {id: userId},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  );
};

export const verifyAccessToken = (token)=>{
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token)=>{
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const setRefreshTokenCookie = (res, refreshToken) =>{
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });
};