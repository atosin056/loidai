import { google } from 'googleapis';
import 'dotenv/config';

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

export const searchyoutube = async (query: string): Promise<any> => {
    const res = await youtube.search.list({
    part: ['snippet'],
    q: query,
    maxResults: 5,
    });

    console.log(res.data.items);
}