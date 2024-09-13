import express from "express";
import { insertUser } from "../models/users/userModel.js";
import { hash } from "../utils/bcrypt.js";
const router = express.Router();

// user signup
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.password = hash(req.body.password);
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "sucess",
          message: " New user has been Registred Sucessfully",
        })
      : res.json({
          status: "error",
          message: " Unable to register the user",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// user login

// user profile

export default router;
