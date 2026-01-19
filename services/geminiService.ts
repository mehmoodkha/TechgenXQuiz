
import { GoogleGenAI } from "@google/genai";

// Always use the API key directly from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIExplanation = async (topic: string, question: string, answer: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior DevOps SRE. Explain this interview concept in detail but simply for a candidate. 
      Topic: ${topic}
      Question: ${question}
      Short Answer: ${answer}
      
      Please provide:
      1. A deeper explanation of the underlying concepts.
      2. A real-world scenario where this knowledge is applied.
      3. A follow-up tip for the interview.
      Keep it structured with markdown.`,
      config: {
        temperature: 0.7,
      }
    });
    
    // Use .text property directly as per guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't generate an explanation right now. Please try again later.";
  }
};
