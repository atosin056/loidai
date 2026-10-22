import { GoogleGenAI } from "@google/genai";
export const geminiFallback = async (question: string) => {
    const ai = new GoogleGenAI({});
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question
        });
        return response;
    }
    catch (error) {
        console.error("Error in Gemini fallback:", error);
        throw error;
    }

}