import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI || "";

mongoose.connect(MONGO_DB_URI).then(
  () => {
    console.log("[DATABASE CONNECTION] Connected to database");
  },
  (error) => {
    console.log(`[DATABASE CONNECTION] Error: ${error}`);
  }
);

export default mongoose;
