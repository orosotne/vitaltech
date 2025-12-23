import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ CHÝBA API KĽÚČ");
  process.exit(1);
}

async function generateImage(prompt, outputFilename) {
  // Using Gemini 3 Pro Image Preview via generateContent
  const modelName = "gemini-3-pro-image-preview"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
  
  console.log(`🎨 Generujem obrázok cez ${modelName} pre: "${prompt}"...`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // Check for image in candidates
    // Structure typically: candidates[0].content.parts[0].inlineData.data (base64)
    // or executableCode / images
    
    let base64Image = null;
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        for (const part of data.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.mimeType.startsWith('image')) {
                base64Image = part.inlineData.data;
                break;
            }
        }
    }

    if (!base64Image) {
      console.log("Full response:", JSON.stringify(data, null, 2));
      throw new Error("No image found in response");
    }

    const buffer = Buffer.from(base64Image, 'base64');
    
    const outputPath = path.join(__dirname, '..', 'public', 'images', outputFilename);
    const dir = path.dirname(outputPath);
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Uložené: ${outputFilename}`);
    
  } catch (error) {
    console.error(`❌ Chyba pri generovaní ${outputFilename}:`, error.message);
  }
}

async function main() {
  console.log("🚀 Spúšťam generovanie tímovej fotky...");
  
  // Detailed description of the user provided image, but with corporate attire
  const prompt = `Generate an image of a professional corporate headshot of a business woman with blonde hair, blue eyes, wearing a navy blue suit in a modern office. Photorealistic, high quality.`;
  
  await generateImage(prompt, `team/office-manager-corporate.jpg`);
  
  console.log("🏁 Hotovo!");
}

main();

