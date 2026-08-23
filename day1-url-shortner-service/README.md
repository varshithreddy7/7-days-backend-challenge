# URL Shortener API

> Day 1 of my 7-Day Backend Challenge

**🟢 Live API URL:** https://url-shortener-api-1ioi.onrender.com

---

## Why I Built This

My goal is to become an **AI Engineering focused developer** - someone who deeply understands backend systems, not just someone who prompts AI to generate them.

To get there, I need **strong fundamentals**. Not just knowing *what* to build, but understanding *why* each piece exists - how the system is structured, why errors are handled a certain way, what happens at each layer of a request. I want to be in full control of the system design. **AI codes, I architect.**

**7 days. 7 backend projects.** Each one targeting core backend concepts - so that when I work with AI agents or build agentic systems in the future, I am the one making the decisions. AI is my execution tool. The thinking is mine.

This is my fundamentals revision - done intentionally, with full ownership of every decision.

---

## What This Project Does

A production-style **RESTful URL Shortener API** that:
- Accepts a long URL and returns a short code
- Redirects users to the original URL via the short code
- Tracks how many times each short link was clicked
- Returns paginated list of all shortened URLs

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js v5 | HTTP server and routing |
| MongoDB | Database |
| Mongoose | ODM and schema validation |
| nanoid | Short code generation |
| dotenv | Environment variable management |
| nodemon | Dev auto-reload |

---

## Architecture

MVC (Model - View - Controller) pattern:

`
src/
|-- config/
|   |-- db.js              # MongoDB connection
|-- controllers/
|   |-- url.controller.js  # Business logic
|-- middlewares/
|   |-- errorHandler.js    # Global error handling
|-- models/
|   |-- Url.js             # Mongoose schema
|-- routes/
|   |-- url.routes.js      # Express router
|-- utils/                 # Helper utilities
app.js                     # Express app setup
server.js                  # Entry point
`

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
git clone https://github.com/varshithreddy7/url-shortener-api.git
cd url-shortener-api
npm install
```

### Environment Variables

Create a .env file in the root:

```env
MONGODB_URL=your_mongodb_connection_string
PORT=8000
```

### Run the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## API Endpoints

### POST /api/shorten
Create a short URL.

```json
Request:  { "originalUrl": "https://www.example.com/long-url" }
Response: { "success": true, "data": { "shortCode": "abc1234", "clicks": 0, ... } }
```

### GET /:shortCode
Redirects (302) to the original URL and increments click count.

### GET /api/urls?page=1&limit=10
Returns paginated list of all URLs.

```json
{
  "success": true,
  "data": [...],
  "pagination": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 }
}
```

---

## Key Concepts Practiced

- REST API design and HTTP status codes
- MVC architecture separation of concerns
- Mongoose schema design with custom validation
- MongoDB indexing for query performance
- Global error handling middleware (ValidationError, Duplicate Key)
- Pagination with skip and limit
- Atomic DB operations (`$inc` for click tracking)
- Environment variables and security best practices
- Conventional Git commit history

---

## The 7-Day Challenge

| Day | Project | Status |
|-----|---------|--------|
| Day 1 | URL Shortener API | Complete |
| Day 2 | Coming soon... | Pending |
| Day 3 | Coming soon... | Pending |
| Day 4 | Coming soon... | Pending |
| Day 5 | Coming soon... | Pending |
| Day 6 | Coming soon... | Pending |
| Day 7 | Coming soon... | Pending |

---

## Author

**Varshith Reddy**
Building backend skills one project at a time.
GitHub: https://github.com/varshithreddy7

> "The best way to learn is to build, understand, then let AI scale your execution."