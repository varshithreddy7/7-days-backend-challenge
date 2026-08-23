import express from "express";
import { globalErrorHandler } from "./src/middlewares/errorHandler.js";
import urlRoutes from "./src/routes/url.routes.js";
import { requestLogger } from "./src/middlewares/logger.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api/v1", urlRoutes);

app.use(globalErrorHandler);
export default app;
