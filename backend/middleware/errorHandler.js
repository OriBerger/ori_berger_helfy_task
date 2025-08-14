const errorHandler = (err, res) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};
export default errorHandler;
