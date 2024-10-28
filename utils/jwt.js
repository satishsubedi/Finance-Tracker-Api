import jwt from "jsonwebtoken";

export const jwttoken = (obj) => {
  const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};
export const decodeToken = (token) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
