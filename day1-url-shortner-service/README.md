# 🔗 Day 1 — URL Shortener Service

A fast, scalable URL Shortener RESTful API built with **Node.js, Express, MongoDB Atlas, and Nanoid**.

🌐 **Live Deployment**: [https://seven-days-backend-challenge.onrender.com](https://seven-days-backend-challenge.onrender.com)

---

## ✨ Features

- ✂️ **Short Code Generation**: Unique, collision-resistant 7-character short codes powered by `nanoid` (`/api/v1/url/shorten`).
- 🔀 **HTTP Redirects**: Instant 302 redirects from short codes to original long URLs (`/:code`).
- 📊 **Analytics & Click Tracking**: Tracks click counts and timestamp of last accessed URL (`GET /api/v1/url/analytics/:code`).
- 🔍 **URL Validation**: Rejects invalid URL formats before database persistence.
- 🗄️ **Isolated MongoDB Database**: Dedicated database space (`url_shortener_db`) on Atlas.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/url/shorten` | Create short URL | `{ "originalUrl": "https://google.com" }` |
| `GET` | `/:code` | Redirect to long URL | None (Direct Browser Navigation) |
| `GET` | `/api/v1/url/analytics/:code` | Get URL click statistics | None |

---

## 💻 Local Development

```bash
cd day1-url-shortner-service
npm install
npm run dev
```
