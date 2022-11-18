import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
/**
 * -------------- DATABASE ----------------
 */

const MONGO_URI = process.env.MONGO_URI;
const prodConnection = process.env.DB_STRING_PROD;
// Connect to the correct environment database
await mongoose.connection.once("open", () =>
  console.log("Connection established!")
);
export const connectDB = async () => {
  if (process.env.DB_STRING_PROD === "production") {
    await mongoose.connect(prodConnection);
    await mongoose.connection.once("connected", () =>
      console.log("Connection established!")
    );
  } else {
    await mongoose.connect(MONGO_URI);
  }
};
