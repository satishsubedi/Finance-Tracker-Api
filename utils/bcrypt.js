import bcrypt from "bcryptjs";
const saltRound = 10;
export const hash = (plainpassword) => {
  return bcrypt.hashSync(plainpassword, saltRound);
};
export const comparePassword = (plainpassword, hashpassword) => {
  return bcrypt.compareSync(plainpassword, hashpassword);
};
