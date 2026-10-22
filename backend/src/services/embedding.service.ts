import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import axios from "axios";

export const generateEmbedding = async (input: string) => {
    const ai = new GoogleGenAI({});
    try {
        const response = await ai.models.embedContent({
            model: 'gemini-embedding-2',
            contents: input
        })
        console.log(response.embeddings?.[0]?.values)
        return response.embeddings?.[0]?.values;
    }
    catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}
