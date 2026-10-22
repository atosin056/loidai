import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';
import { generateEmbedding } from './embedding.service.js';
import { geminiFallback } from './fallback.service.js';

// define the necessary variables for the PINECONE API
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_URL = process.env.PINECONE_URL;

if (!PINECONE_API_KEY || !PINECONE_URL) {
  throw new Error("PINECONE_API_KEY and PINECONE_URL must be set in the environment variables.");
}

const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

const index = pinecone.index({ host: PINECONE_URL });

export const searchPinecone = async (embdeddings: number[], question: string) => {
    const results = await index.query({
        vector: embdeddings,
        topK: 10,
        includeMetadata: true,
    });

    const bestMatch = results.matches[0];
    const scoreThreshold: number = 0.85;

    if(!bestMatch?.score) {
        throw new Error("No matches found in Pinecone.");
    }

    if (bestMatch && bestMatch?.score >= scoreThreshold) {
        return bestMatch;
    }

    else {
        // Fallback to gemini
        console.log("No suitable match found. Using Gemini as fallback.");
        const fallbackResponse = await geminiFallback(question);
        return {
            id: "gemini-fallback",
            score: 1.0,
            metadata: {
                question: question,
                answer: fallbackResponse
            }
        };
    }
}




// const embedding: number[] = await generateEmbedding();

// const results = await searchPinecone(embedding);
// console.log("Search results:", results);

// const scoreThreshold: number = 0.85;
// const bestMatch: any = results[0];

// if (bestMatch && bestMatch.score >= scoreThreshold) {
//     console.log("Best match found:", bestMatch);
// }

// else {
//     // Fallback to gemini
//     console.log("No suitable match found. Using Gemini as fallback.");
// }