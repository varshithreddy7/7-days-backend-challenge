import {Router} from 'express';
import passport from '../config/passport.js';
import { authRateLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  register,
  verifyEmail,
  login,
  logout,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  googleCallback,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authRateLimiter, register);
router.get('/verify-email', verifyEmail);
router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshAccessToken);
router.post('/forgot-password', authRateLimiter, forgotPassword);
router.post('/reset-password', authRateLimiter, resetPassword);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

export default router;