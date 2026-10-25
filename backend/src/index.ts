import express from "express";
import cors from "cors";
import { searchyt } from "./controllers/searchyoutube.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/search/youtube", searchyt);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
