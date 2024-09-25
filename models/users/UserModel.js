import userSchema from "./UserSchema.js";

export const insertUser = (userobj) => {
  return userSchema(userobj).save();
};
export const checkUser = (email) => {
  return userSchema.findOne({ email });
};
