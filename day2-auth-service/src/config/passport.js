import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user with this googleId already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // 2. If not found by googleId, check if email exists (registered manually before)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google ID to existing user account
          user.googleId = profile.id;
          user.isEmailVerified = true; // Google emails are pre-verified!
          await user.save();
          return done(null, user);
        }

        // 3. Create a brand new user for OAuth
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isEmailVerified: true, // Google pre-verifies emails
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
