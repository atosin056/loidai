import { google, youtube_v3 } from 'googleapis';
import 'dotenv/config';

export type SearchResult = {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
    channelTitle: string;
    publishedAt: string;
    url: string;
};

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

const formatResponse = (item: youtube_v3.Schema$SearchResult): SearchResult | null => {
    const videoId = item.id?.videoId;
    if (!videoId) return null;

    const snippet = item.snippet;
    const thumbnails = snippet?.thumbnails;

    return {
        videoId,
        title: snippet?.title ?? '',
        description: snippet?.description ?? '',
        thumbnail:
            thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url ?? '',
        channelTitle: snippet?.channelTitle ?? '',
        publishedAt: snippet?.publishedAt ?? '',
        url: `https://www.youtube.com/watch?v=${videoId}`,
    };
};

export const searchyoutube = async (query: string): Promise<SearchResult[]> => {
    const response = await youtube.search.list({
        part: ['snippet'],
        q: query,
        maxResults: 5,
        type: ['video'],
    });

    return (response.data.items ?? [])
        .map(formatResponse)
        .filter((item): item is SearchResult => item !== null);
};