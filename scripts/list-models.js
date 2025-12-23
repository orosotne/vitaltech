import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ API Key missing");
  process.exit(1);
}

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Available models:");
    data.models.forEach(m => {
        if (m.name.includes('image') || m.supportedGenerationMethods.includes('predict')) {
            console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
        }
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();

