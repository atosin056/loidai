import type { Request, Response } from 'express';
import { searchPinecone, type BestResult } from '../services/searchpinecone.service.js';
import { generateEmbedding } from '../services/embedding.service.js';

type SearchResponse = {
  success: boolean;
  query: string;
  results_found: number;
  results: BestResult[];
};

export const search = async (req: Request, res: Response) => {
  const question = req.body?.question;

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ success: false, error: 'question is required' });
  }

  try {
    const embedding = await generateEmbedding(question);
    const best = await searchPinecone(embedding, question);

    const body: SearchResponse = {
      success: true,
      query: question,
      results_found: 1,
      results: [best],
    };

    return res.status(200).json(body);
  } catch (err) {
    console.error('Search failed:', err);
    return res.status(500).json({ success: false, error: 'Search failed' });
  }
};