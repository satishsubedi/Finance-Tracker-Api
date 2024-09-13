import userSchema from "./UserSchema.js";

export const insertUser = (userobj) => {
  return userSchema(userobj).save();
};
