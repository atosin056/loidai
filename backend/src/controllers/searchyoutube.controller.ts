import type { Request, Response } from 'express';
import { buildytquery } from '../services/buildquery.service.js';
import { searchyoutube, type SearchResult } from '../services/searchyoutube.service.js';

type SearchYtResponse = {
  success: boolean;
  prompt: string;
  totalFound: number;
  videos: SearchResult[];
};

export const searchyt = async (req: Request, res: Response) => {
  const question: unknown = req.body?.question;

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ success: false, error: 'question is required' });
  }

  try {
    const query = (await buildytquery(question))?.trim() ?? '';

    if (!query) {
      return res.status(422).json({ success: false, error: 'Could not build a search query, please try again' });
    }

    const videos = await searchyoutube(query);

    const body: SearchYtResponse = {
      success: true,
      prompt: question,
      totalFound: videos.length,
      videos,
    };

    return res.status(200).json(body);
  } catch (err) {
    console.error('YouTube search failed:', err);
    return res.status(500).json({ success: false, error: 'YouTube search failed' });
  }
};