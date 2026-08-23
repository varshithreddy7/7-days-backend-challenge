import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./src/config/passport.js";
import authRoutes from "./src/routes/auth.routes.js";
import protectedRoutes from "./src/routes/protected.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(passport.initialize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/protected", protectedRoutes);

app.get("/", (req, res)=>{
  res.json({message: "Authentication & Authorization service is running!"});
})

export default app;
