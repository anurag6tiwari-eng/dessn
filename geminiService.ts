
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getEligibilityAdvice(merchantData: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        The merchant is currently working on loan eligibility. 
        Current status: ${JSON.stringify(merchantData)}
        Give a short, professional, and encouraging 2-sentence tip on how they can improve their business credibility to get a loan faster. 
        Focus on either Digital Payments (Soundbox), Credit Score, or Document Transparency.
      `,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });

    return response.text || "Keep growing your digital sales with Soundbox to unlock better loan offers soon!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Focus on maintaining consistent ₹10,000+ monthly GMV to qualify for instant loan offers.";
  }
}

export async function explainBureauCheck() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Explain in simple terms (2 sentences max) why a Bureau Credit Check is important for a merchant loan and that it doesn't hurt their score if it's a soft pull.",
      config: { maxOutputTokens: 100 }
    });
    return response.text;
  } catch (error) {
    return "A credit check helps lenders understand your repayment history. Checking your own eligibility here is a soft pull and won't impact your score.";
  }
}
