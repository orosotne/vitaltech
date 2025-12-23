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

async function editImage(inputFilename, outputFilename, prompt) {
  const modelName = "gemini-3-pro-image-preview"; // Or appropriate model supporting image input
  // Note: For actual background replacement preserving identity perfectly, 'editing' endpoints are best.
  // But Gemini 1.5 Pro / Flash or Gemini 3 Pro with image input can generate variations.
  // Ideally we want pixel-level preservation of the face. 
  // Standard multimodal generation might reimagine the face slightly.
  // Let's try standard generateContent with image input first.
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
  
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'team', inputFilename);
  
  if (!fs.existsSync(inputPath)) {
      console.error(`❌ Vstupný súbor neexistuje: ${inputPath}`);
      return;
  }

  const imageBuffer = fs.readFileSync(inputPath);
  const base64ImageInput = imageBuffer.toString('base64');

  console.log(`🎨 Upravujem obrázok ${inputFilename} cez ${modelName}...`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { 
              inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageInput
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
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
    
    const outputPath = path.join(__dirname, '..', 'public', 'images', 'team', outputFilename);
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
  console.log("🚀 Spúšťam úpravu fotky...");
  
  // Prompt asking to enhance the photo professionally with specific camera settings AND HEADROOM
  const prompt = `Professional corporate headshot of this woman, shot by a pro photographer with 20 years of experience, high-end studio photography, professional 3-point lighting, rim light, softbox, sharp focus, highly detailed skin texture, 8k resolution, shot on Canon R5 with 85mm lens, f/1.8, shallow depth of field, dark clean studio background. Keep her facial features exactly as in the original image. IMPORTANT: Composition must have generous space above her head (headroom), the hair must not touch the top edge of the frame. Zoom out slightly if needed.`;
  
  await editImage('anka.jpg', 'office-manager-studio-v2.jpg', prompt);
  
  console.log("🏁 Hotovo!");
}

main();

