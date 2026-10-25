import express from "express";
import cors from "cors";
import { searchyt } from "./controllers/searchyoutube.controller.js";
import { search } from "./controllers/search.controller.js";

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// Routes
app.post('/api/search/ai', search); // Search route pointing to the Search Pinecone controller
app.post("/api/search/youtube", searchyt); // Search router pointing to the search youtube controller
