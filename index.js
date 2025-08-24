import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
