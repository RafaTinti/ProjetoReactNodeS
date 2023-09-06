import userRoutes from "./routes/users.js"
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes)

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});