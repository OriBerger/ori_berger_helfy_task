import cors from "cors";
import express, { json } from "express";
import errorHandler from "./middleware/errorHandler.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
