import express from "express";
import { checkUser, insertUser } from "../models/users/userModel.js";
import { comparePassword, hash } from "../utils/bcrypt.js";
import { jwttoken } from "../utils/jwt.js";
import { auth } from "../middlewares/authmiddleware.js";
const router = express.Router();

// user signup
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hash(req.body.password);
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: " New user has been Registred Sucessfully",
        })
      : res.json({
          status: "error",
          message: " Unable to register the user",
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      error.message =
        "There is an another user with same email .Please try to register with different email";
    }
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// user login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await checkUser(email);

      const matchPassword = comparePassword(password, user.password);
      console.log(matchPassword);
      if (matchPassword) {
        const token = jwttoken({ email });

        res.json({
          status: "success",
          message: "User Login Sucessfully",
          user,
          token,
        });
        return;
      }
      res.status(401).json({
        error: "Invalid password or email",
      });
    }
  } catch (error) {
    next(error);
  }
});

// user profile
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userinfo;
    res.json({
      status: "success",
      message: "Here is the User Profile",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
