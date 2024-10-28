export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCoder || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
