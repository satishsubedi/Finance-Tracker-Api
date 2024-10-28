import TransactionSchema from "./TransactionSchema.js";

export const insertTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

export const getTransaction = (userID) => {
  if (!userID) {
    throw new Error("userid is required");
  }
  return TransactionSchema.find({ userID });
};

export const getTransactionbyId = (_id) => {
  if (!_id) {
    throw new Error("userid is required");
  }
  return TransactionSchema.findById(_id);
};
export const deleteTransaction = (userId, txid) => {
  return TransactionSchema.deleteMany({ userID: userId, _id: { $in: txid } });
};

export const editTransaction = (id, rest) => {
  return TransactionSchema.findByIdAndUpdate(id, rest);
};
