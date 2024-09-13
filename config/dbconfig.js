import mongoose from "mongoose";
const monogo_url = "mongodb://localhost:27017/finance_tracker";

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(monogo_url);
    conn && console.log(" DB Coonect");
  } catch (error) {
    console.log(error);
  }
};
