# 🔐 Day 2 — Authentication & Authorization Microservice

A production-grade, secure, multi-tenant Authentication and Authorization service built with **Node.js, Express, MongoDB Atlas, JWT (Access + Refresh tokens), bcrypt, Google OAuth 2.0, Nodemailer, and Role-Based Access Control (RBAC)**.

🌐 **Live Deployment**: [https://seven-days-backend-challenge-amui.onrender.com](https://seven-days-backend-challenge-amui.onrender.com)

---

## ✨ Features

- 🔑 **Password Hashing**: Pure JavaScript `bcryptjs` algorithm with Mongoose `pre("save")` hooks.
- 🎟️ **Dual JWT Token Architecture**:
  - **Access Token**: Short-lived (`15m`), passed via `Authorization: Bearer <token>` header for stateless API requests.
  - **Refresh Token**: Long-lived (`7d`), stored in `HttpOnly` `SameSite=Strict` secure cookies to prevent XSS and CSRF attacks.
- 🔄 **Token Rotation & Invalidation**: Token rotation on refresh and active token revoking in DB on logout.
- 📧 **Email Verification & Password Reset**: Time-limited crypto tokens with HTML email templates via `nodemailer`.
- 🌐 **Google OAuth 2.0**: Social login integration using `passport` and `passport-google-oauth20` strategies.
- 🛡️ **Role-Based Access Control (RBAC)**: Fine-grained access control middleware (`user`, `admin`, `moderator`).
- ⚡ **Rate Limiting**: Protection against brute-force attacks via `express-rate-limit`.
- 🗄️ **Isolated MongoDB Database**: Database separation on Atlas (`auth_service_db`).

---

## 📡 API Endpoint Reference

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Payloads / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register user | `{ "name": "...", "email": "...", "password": "..." }` |
| `GET` | `/api/v1/auth/verify-email` | Verify email token | `?token=XYZ_TOKEN` |
| `POST` | `/api/v1/auth/login` | Authenticate user | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/v1/auth/refresh-token` | Issue new Access Token | Reads HttpOnly Cookie |
| `POST` | `/api/v1/auth/logout` | Revoke session | Clears Cookie & DB token |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset | `{ "email": "..." }` |
| `POST` | `/api/v1/auth/reset-password` | Reset password | `{ "token": "...", "newPassword": "..." }` |
| `GET` | `/api/v1/auth/google` | Google OAuth consent | Redirects to Google login |
| `GET` | `/api/v1/auth/google/callback` | OAuth Callback | Receives code & redirects to client |

### Protected & RBAC Routes (`/api/v1/protected`)

*Requires `Authorization: Bearer <accessToken>` header*

| Method | Endpoint | Required Role | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/protected/profile` | Any logged-in user | Retrieve authenticated user profile |
| `GET` | `/api/v1/protected/admin` | `admin` | Admin dashboard access |
| `GET` | `/api/v1/protected/mod` | `admin` or `moderator` | Moderator control panel |

---

## 🛠️ Environment Variables Setup

Create a `.env` file inside `day2-auth-service/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/auth_service_db?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
NODE_ENV=development
```

---

## 💻 Local Development

```bash
cd day2-auth-service
npm install
npm run dev
```
