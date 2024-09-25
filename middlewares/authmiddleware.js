import e from "express";
import { decodeToken } from "../utils/jwt.js";
import { checkUser } from "../models/users/userModel.js";

export const auth = async (req, res, next) => {
  try {
    //.Create the Auth Middleware
    const { authorization } = req.headers;

    // validate the token is correct
    const result = decodeToken(authorization);
    console.log(result);
    // get user email from the token
    if (result?.email) {
      const user = await checkUser(result.email);

      if (user?.id) {
        // store user info in the headers
        req.userinfo = user;
        // console.log(req.userinfo, "pppp");
        return next();
      }
    }
    res.status(403).json({
      error: "Unauthorized",
    });
    // gey user by email
    // const isAuth = false;
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
