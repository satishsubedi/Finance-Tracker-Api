import express from "express";
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionRouter.js";
import { connectMongoDb } from "./config/dbconfig.js";
const app = express();
import cors from "cors";
import { auth } from "./middlewares/authmiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(cors());

const PORT = process.env.PORT || 8000;
//Middlewares
app.use(express.json());
//Api Endpoints
app.use("/api/v1/users", userRouter); //user post for signup data
app.use("/api/v1/users/login", userRouter); // user for the login data
app.use("/api/v1/transaction", auth, transactionRouter);
app.use("api/v1/transaction/id", auth, transactionRouter);
// app.use("api/v1/transaction", auth, transactionRouter);
console.log(process.env.JWT_SECRET);
app.get("/", (req, res) => {
  res.json({
    message: "It's Live",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

connectMongoDb();

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`);
});
