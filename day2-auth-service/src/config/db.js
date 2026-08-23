import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected: ", connect.connection.host);
  } catch (error) {
    console.error("❌", error.message);
    process.exit(1);
  }
}

export default connectDb;