import express from "express";
import { auth } from "../middlewares/authmiddleware.js";
import {
  deleteTransaction,
  editTransaction,
  getTransaction,
  getTransactionbyId,
  insertTransaction,
} from "../models/transactions/TransactionModel.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userinfo;
    req.body.userID = _id;
    const response = await insertTransaction(req.body);

    response?._id
      ? res.json({
          status: "success",
          message: "Add Transaction Sucessfully",
        })
      : res.json({
          status: "error",
          message: "Unable to Add Transaction ",
        });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userinfo;

    const transactions = await getTransaction(_id);

    res.json({
      status: "success",
      message: "Here are the transaction details",
      transactions,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const transactions = await getTransactionbyId(_id);

    res.json({
      status: "success",
      message: "Here are the transaction details",
      transactions,
    });
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const { _id } = req.userinfo;
    const ids = req.body;
    const response = await deleteTransaction(_id, ids);
    response?.deletedCount
      ? res.json({
          status: "success",
          message: "Transaction deleted Sucessfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete Transaction ",
        });
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const response = await editTransaction(_id, rest, { new: true });
    console.log(response, "kkk");
    response?._id
      ? res.json({
          status: "success",
          message: "Transaction Edited Sucessfully",
        })
      : res.json({
          status: "error",
          message: "Unable to Edit Transaction ",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
