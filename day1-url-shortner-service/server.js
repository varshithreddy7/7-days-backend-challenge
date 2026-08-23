import app from "./app.js";
import connectDb from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const PORT = parseInt(process.env.PORT) || 8000;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
