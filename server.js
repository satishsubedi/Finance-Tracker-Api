import express from "express";
import userRouter from "./routers/userRouter.js";
import { connectMongoDb } from "./config/dbconfig.js";
const app = express();
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 8000;
//Middlewares
app.use(express.json());
//Api Endpoints
app.use("/api/v1/users", userRouter); //user post for signup data
app.use("/api/v1/users/login", userRouter); // user for the login data
console.log(process.env.JWT_SECRET);
app.use("/", (req, res) => {
  res.json({
    message: "It's Live",
  });
});

connectMongoDb();

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
