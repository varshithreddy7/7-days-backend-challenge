# ?? 7 Days Backend Challenge

A hands-on engineering challenge building production-ready, scalable microservices from scratch using Node.js, Express, MongoDB, Redis, JWT, and OAuth.

---

## ?? Project Dashboard

| Day | Service | Tech Stack | Status | Live Demo |
| :--- | :--- | :--- | :---: | :--- |
| **Day 1** | [URL Shortener Service](./day1-url-shortner-service/) | Node.js, Express, MongoDB, Mongoose, Nanoid | ? Done | [Live API](https://seven-days-backend-challenge.onrender.com) |
| **Day 2** | [Auth & Authorization Service](./day2-auth-service/) | Node.js, Express, MongoDB, JWT, bcrypt, Passport.js, OAuth 2.0, Nodemailer, Rate Limiter | ? Done | [Live API](https://seven-days-backend-challenge-amui.onrender.com) |
| **Day 3** | Coming Soon | TBD | ? | - |
| **Day 4** | Coming Soon | TBD | ? | - |
| **Day 5** | Coming Soon | TBD | ? | - |
| **Day 6** | Coming Soon | TBD | ? | - |
| **Day 7** | Coming Soon | TBD | ? | - |

---

## ?? Repository Architecture

`
7-days-backend-challenge/
+-- README.md                      ? Monorepo Overview
+-- .gitignore                     ? Global Gitignore
¦
+-- day1-url-shortner-service/     ? Day 1 Microservice
¦   +-- src/
¦   ¦   +-- config/
¦   ¦   +-- controllers/
¦   ¦   +-- middlewares/
¦   ¦   +-- models/
¦   ¦   +-- routes/
¦   +-- app.js
¦   +-- server.js
¦   +-- README.md
¦
+-- day2-auth-service/             ? Day 2 Microservice
    +-- src/
    ¦   +-- config/
    ¦   +-- controllers/
    ¦   +-- middlewares/
    ¦   +-- models/
    ¦   +-- routes/
    ¦   +-- utils/
    +-- app.js
    +-- server.js
    +-- README.md
`

---

## ?? Running Locally

Each service is an independent microservice. Navigate to the service folder and start it:

`ash
# Day 1 - URL Shortener
cd day1-url-shortner-service
npm install
npm run dev

# Day 2 - Auth Service
cd day2-auth-service
npm install
npm run dev
`

---

## ?? Deployment Configuration (Render Monorepo)

When deploying to [Render](https://render.com), set the **Root Directory** for each service:

- **Day 1**: Root Directory = day1-url-shortner-service ? [https://seven-days-backend-challenge.onrender.com](https://seven-days-backend-challenge.onrender.com)
- **Day 2**: Root Directory = day2-auth-service ? [https://seven-days-backend-challenge-amui.onrender.com](https://seven-days-backend-challenge-amui.onrender.com)

---

## ?? Author

**Varshith Reddy**
- GitHub: [@varshithreddy7](https://github.com/varshithreddy7)
- Repository: [7-days-backend-challenge](https://github.com/varshithreddy7/7-days-backend-challenge)
