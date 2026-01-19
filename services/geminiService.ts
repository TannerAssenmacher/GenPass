
import { GoogleGenAI, Type } from "@google/genai";
import { SecurityReport } from "../types";

export const analyzePassword = async (password: string): Promise<SecurityReport> => {
  // Get API key from environment variable (set via Vite)
  // Vite exposes env vars prefixed with VITE_ via import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  
  if (!apiKey) {
    console.error("Gemini API key is not set. Please set VITE_GEMINI_API_KEY in your .env file.");
    return {
      score: 50,
      strength: "Moderate",
      analysis: "API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.",
      timeToCrack: "N/A",
      improvementTip: "Configure your Gemini API key to enable AI analysis!"
    };
  }
  
  console.log("API Key loaded:", apiKey ? `${apiKey.substring(0, 10)}...` : "NOT FOUND");
  const ai = new GoogleGenAI({ apiKey });

  // Try multiple models in order of preference (fastest first)
  const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
  
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Analyze the security of this password: "${password}". 
        Return the evaluation in a strict JSON format. Include a very short, one-line fun improvement tip.
        
        CRITICAL INSTRUCTION: Do NOT suggest adding emojis. Only suggest valid password characters like symbols, numbers, or changing case/length. Emojis are not supported characters in this generator.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "A score from 0-100" },
              strength: { type: Type.STRING, enum: ["Weak", "Moderate", "Strong", "Elite"] },
              analysis: { type: Type.STRING, description: "A concise security tip or analysis" },
              timeToCrack: { type: Type.STRING, description: "Estimated time to brute-force" },
              improvementTip: { type: Type.STRING, description: "A very short one-line tip on what to add for max strength + fun feedback. MUST NOT mention emojis." }
            },
            required: ["score", "strength", "analysis", "timeToCrack", "improvementTip"]
          }
        }
      });

      // The .text property is a getter that directly returns the string output from the model.
      const resultText = response.text;
      if (!resultText) {
        throw new Error("Received empty response from the AI model");
      }
      const parsed = JSON.parse(resultText.trim());
      console.log(`Successfully used model: ${modelName}`);
      return parsed;
    } catch (error: any) {
      // If it's a 404 (model not found), try the next model
      if (error?.error?.code === 404 || error?.message?.includes("not found")) {
        console.log(`Model ${modelName} not available, trying next...`);
        continue;
      }
      // For other errors, log and try next model
      console.error(`Error with model ${modelName}:`, error);
      continue;
    }
  }
  
  // If all models failed, return fallback
  console.error("All Gemini models failed. Please check your API key and available models.");
  return {
    score: 50,
    strength: "Moderate",
    analysis: "Unable to reach AI for deep analysis. Check API key and model availability.",
    timeToCrack: "N/A",
    improvementTip: "Add some spice with symbols! (AI is sleeping)"
  };
};
