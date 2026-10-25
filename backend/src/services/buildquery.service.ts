import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

export const buildytquery = async ( question: string ) => {
    const ai = new GoogleGenAI({});
    const SYSTEM_INSTRUCTION: string = `You are an AI health assistant that turns users questions into searchable youtube queries that produces actual results, you output a One sentence youtube searchable summary of the query given to you, example: user: I have a cut, Response: First aid for cuts. alright over to you context: ${question}`;

    try {
        const response = await ai.interactions.create({
            model: 'gemini-2.5-flash',
            input: SYSTEM_INSTRUCTION
        })
        console.log("Gemini fallback response:", response.output_text);
        return response.output_text;

    }
    catch (err: any) {
        throw new Error(err.message)
    }

}