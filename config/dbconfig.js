import mongoose from "mongoose";
const monogo_url = process.env.MONGO_URL;

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(monogo_url);
    conn && console.log(" DB Coonect");
  } catch (error) {
    console.log(error);
  }
};
