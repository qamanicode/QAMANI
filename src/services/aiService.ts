import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface BlockData {
  type: 'navbar' | 'hero' | 'features' | 'pricing' | 'footer';
  data: any;
}

const BLOCK_SCHEMAS = {
  navbar: {
    type: Type.OBJECT,
    properties: {
      logoText: { type: Type.STRING },
      links: { type: Type.ARRAY, items: { type: Type.STRING } },
      ctaText: { type: Type.STRING }
    },
    required: ["logoText", "links", "ctaText"]
  },
  hero: {
    type: Type.OBJECT,
    properties: {
      badge: { type: Type.STRING },
      title: { type: Type.STRING },
      subtitle: { type: Type.STRING },
      primaryCta: { type: Type.STRING },
      secondaryCta: { type: Type.STRING },
      imageUrl: { type: Type.STRING }
    },
    required: ["badge", "title", "subtitle", "primaryCta", "secondaryCta", "imageUrl"]
  },
  features: {
    type: Type.OBJECT,
    properties: {
      items: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            desc: { type: Type.STRING }
          },
          required: ["title", "desc"]
        }
      }
    },
    required: ["items"]
  },
  pricing: {
    type: Type.OBJECT,
    properties: {
      plans: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            price: { type: Type.STRING },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
            popular: { type: Type.BOOLEAN }
          },
          required: ["name", "price", "features"]
        }
      }
    },
    required: ["plans"]
  },
  footer: {
    type: Type.OBJECT,
    properties: {
      logoText: { type: Type.STRING },
      desc: { type: Type.STRING },
      copyright: { type: Type.STRING }
    },
    required: ["logoText", "desc", "copyright"]
  }
};

export const aiService = {
  async generateLayout(prompt: string): Promise<BlockData[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are a professional web designer. Based on the user prompt, return a list of website blocks in JSON format.
        Available types: navbar, hero, features, pricing, footer.
        Return ONLY the JSON array of objects with { type, data } structure.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, description: "Type of the block: navbar, hero, features, pricing, footer" },
              data: { type: Type.OBJECT, description: "Data for the block based on its specific structure" }
            },
            required: ["type", "data"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return [];
    }
  },

  async visionToLayout(base64Image: string): Promise<BlockData[]> {
    const imagePart = {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image.split(',')[1] || base64Image,
      },
    };
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        imagePart,
        { text: "Analyze this website screenshot/sketch and convert it into a structured JSON layout using our custom block types: navbar, hero, features, pricing, footer. Ensure the content matches the image." }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              data: { type: Type.OBJECT }
            },
            required: ["type", "data"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse Gemini vision response", e);
      return [];
    }
  },

  async magicPen(text: string, action: 'improve' | 'seo' | 'translate', targetLanguage?: string): Promise<string> {
    const actionPrompts = {
      improve: "Refine and make this text more professional and engaging.",
      seo: "Optimize this text for search engines (SEO) while maintaining readability.",
      translate: `Translate this text to ${targetLanguage || 'English'}.`
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${actionPrompts[action]} Original text: "${text}"`,
      config: {
        systemInstruction: "You are an expert copywriter. Return ONLY the refined text without any quotes or explanations.",
      }
    });

    return response.text?.trim() || text;
  }
};
