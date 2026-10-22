import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

export const generateEmbedding = async (input: string): Promise<number[]> => {
    const ai = new GoogleGenAI({});
    try {
        const response = await ai.models.embedContent({
            model: 'gemini-embedding-001',
            contents: input
        })
        console.log(response.embeddings?.[0]?.values)
        const values = response.embeddings?.[0]?.values;
        if (!values) {
            throw new Error("No embedding returned from the API.");
        }

        return values;
    }
    catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}
