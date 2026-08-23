import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("Please provide the MongoDB URL");
    }
    await mongoose.connect(mongoUrl);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectDb;