import { google, youtube_v3 } from 'googleapis';
import 'dotenv/config';

type searchResult = {
    videoId: string,
    title: string,
    description: string,
    thumbnail: string,
    channelTitle: string,
    publishedAt: string,
    url: string
}

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

const formatResponse = (item: youtube_v3.Schema$SearchResult): searchResult | null => {
    const videoId = item.id?.videoId;
    if (!videoId) return null;

    const snippet = item.snippet;
    const thumbs = snippet?.thumbnails;

    return {
        videoId,
        title: snippet?.title ?? '',
        description: snippet?.description ?? '',
        thumbnail: thumbs?.high?.url ?? thumbs?.medium?.url ?? thumbs?.default?.url ?? '',
        channelTitle: snippet?.channelTitle ?? '',
        publishedAt: snippet?.publishedAt ?? '',
        url: `https://www.youtube.com/watch?v=${videoId}`,
    };
};

export const searchyoutube = async (query: string) => {
    const res = await youtube.search.list({
        part: ['snippet'],
        q: query,
        maxResults: 5,
    });

    if (res.data.items) {
        const data = res.data.items;
        const bestMatch:  searchResult| null  = formatResponse(data[0]);
        const secondBest: searchResult | null  = formatResponse(data[1]);
        
        return [ bestMatch, secondBest ]

    }
}

const search = await searchyoutube('first aid for cuts');
console.log(search)
