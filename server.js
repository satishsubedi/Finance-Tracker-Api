import express from "express";
import userRouter from "./routers/userRouter.js";
import { connectMongoDb } from "./config/dbconfig.js";
const app = express();

const PORT = process.env.PORT || 8000;
//Middlewares
app.use(express.json());
//Api Endpoints
app.use("/api/v1/users", userRouter);

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
