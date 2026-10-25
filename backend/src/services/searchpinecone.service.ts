import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';
import { geminiFallback } from './fallback.service.js';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_URL = process.env.PINECONE_URL;

if (!PINECONE_API_KEY || !PINECONE_URL) {
  throw new Error("PINECONE_API_KEY and PINECONE_URL must be set in the environment variables.");
}

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.index({ host: PINECONE_URL });

export type BestResult = {
  id: string;
  score: number;
  question: string;
  answer: string;
};

const SCORE_THRESHOLD = 0.85;

export const searchPinecone = async (
  embeddings: number[],
  question: string
): Promise<BestResult> => {
  const results = await index.query({
    vector: embeddings,
    topK: 10,
    includeMetadata: true,
  });

  const match = results.matches[0];

  if (match && (match.score ?? 0) >= SCORE_THRESHOLD) {
    return {
      id: match.id,
      score: match.score ?? 0,
      question: String(match.metadata?.pattern ?? ''),
      answer: String(match.metadata?.response ?? ''),
    };
  }

  // Fallback to Gemini, same shape
  console.log("No suitable match found. Using Gemini as fallback.");
  const fallbackResponse = await geminiFallback(question);

  if (!fallbackResponse) {
    throw new Error("Gemini fallback returned no response.");
  }

  return {
    id: 'gemini-fallback',
    score: 1.0,
    question,
    answer: fallbackResponse,
  };
};