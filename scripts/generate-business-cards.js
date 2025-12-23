import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import sharp from 'sharp';
import { jsPDF } from 'jspdf';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ CHÝBA API KĽÚČ (GOOGLE_API_KEY)");
  process.exit(1);
}

// Convert SVG to PNG buffer for the API
async function prepareLogo(logoPath) {
    try {
        const buffer = await sharp(logoPath)
            .png()
            .toBuffer();
        return buffer.toString('base64');
    } catch (error) {
        console.error("❌ Chyba pri konverzii loga:", error);
        throw error;
    }
}

async function generateImageWithLogo(prompt, logoPath, outputFilename) {
  const modelName = "gemini-3-pro-image-preview"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
  
  console.log(`🎨 Pripravujem logo z: ${logoPath}`);
  const logoBase64 = await prepareLogo(logoPath);

  console.log(`🎨 Generujem vizitku cez ${modelName}...`);
  console.log(`Prompt: ${prompt}`);

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
                mimeType: "image/png",
                data: logoBase64
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
    
    // Save JPG
    const outputDir = path.join(__dirname, '..', 'BUSINESS CARDS');
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const jpgPath = path.join(outputDir, outputFilename);
    fs.writeFileSync(jpgPath, buffer);
    console.log(`✅ Obrázok uložený: ${jpgPath}`);

    // Generate PDF
    await generatePDF(jpgPath, outputDir, outputFilename.replace('.jpg', '.pdf'));

  } catch (error) {
    console.error(`❌ Chyba pri generovaní:`, error.message);
    process.exit(1);
  }
}

async function generatePDF(imagePath, outputDir, pdfFilename) {
    console.log(`📄 Vytváram PDF...`);
    // Standard business card: 85mm x 55mm
    // A4 is 210 x 297 mm. We will create a PDF with the exact size of the card.
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85, 55] 
    });

    // Load image info to get dimensions/ratio if needed, but we will stretch/fit to card size
    // or keep aspect ratio. The AI generates 16:9 or 1:1 usually, so we might need to crop or fit.
    // For business cards, 1.545 aspect ratio (85/55) is standard.
    
    // Read image as base64 for jsPDF
    const imgData = fs.readFileSync(imagePath).toString('base64');
    
    // Add image to PDF (x, y, width, height)
    doc.addImage(imgData, 'JPEG', 0, 0, 85, 55);
    
    const pdfPath = path.join(outputDir, pdfFilename);
    doc.save(pdfPath);
    console.log(`✅ PDF uložené: ${pdfPath}`);
}

async function main() {
  console.log("🚀 Spúšťam generovanie vizitky s logom...");
  
  const logoPath = path.join(__dirname, '..', 'public', 'logo_vitaltech.svg');
  
  // Checking if logo exists, if not try png
  if (!fs.existsSync(logoPath)) {
      console.error(`❌ Logo nenájdené na: ${logoPath}`);
      process.exit(1);
  }

  const prompt = `Create a professional business card design for "Peter Činčura", Sales Manager at "Vitaltech".
  USE THE ATTACHED LOGO IMAGE EXACTLY AS IT IS. Do not hallucinate a new logo.
  Place the logo prominently on the card.
  
  Details to include textually:
  Name: Peter Činčura
  Role: Sales Manager
  Phone: +421 908 601 202
  Email: peter.cincura@vitaltech.sk (inferred)
  Website: www.vitaltech.sk
  
  Design Style:
  - Background: Clean white or very light grey.
  - Accents: The bottom part of the card MUST have a green gradient design element (waves or curves), mimicking the style and color of the green circle in the Vitaltech logo.
  - Layout: Modern, minimalist, easy to read.
  - Aspect Ratio: Business card (approx 1.55:1).
  `;
  
  await generateImageWithLogo(prompt, logoPath, `peter_cincura_card_v3.jpg`);
  
  console.log("🏁 Hotovo!");
}

main();
