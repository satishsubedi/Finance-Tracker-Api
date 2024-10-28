import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tdate: {
      type: Date,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("transaction", transactionSchema);
