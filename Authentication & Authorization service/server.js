import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDb from "./src/config/db.js";

const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌", error.message);
  process.exit(1);
});
