import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ CHÝBA API KĽÚČ: Vytvorte súbor .env a pridajte doň riadok: GOOGLE_API_KEY=vas_kluc");
  process.exit(1);
}

// Data from content.ts
const services = [
  { id: 'eventy-a-priestory', title: 'Eventy & Priestory', desc: 'Firemné eventy na kľúč – od produkcie cez techniku až po koordináciu.' },
  { id: 'it-servis', title: 'IT Servis & PC riešenia', desc: 'Spoľahlivá IT infraštruktúra pre firmy – bez výpadkov, bez starostí.' },
  { id: 'marketing-a-reklama', title: 'Marketing & Reklama', desc: 'Stratégia, kreatíva a exekúcia – všetko pod jednou strechou.' }
];

const realizations = [
  { id: '1', title: 'Mestské slávnosti 2023', desc: 'Kompletná organizácia dní mesta, technické zabezpečenie a program.' },
  { id: '2', title: 'IT Infraštruktúra Logistics s.r.o.', desc: 'Dodávka a inštalácia 20 kancelárskych staníc + sieťové riešenie.' },
  { id: '3', title: 'Rebranding hotela Park', desc: 'Nová vizuálna identita, tlačoviny a event promo pri znovuotvorení.' },
  { id: '4', title: 'Konferencia TechMeet', desc: 'Prenájom priestorov a catering pre 150 účastníkov.' },
  { id: '5', title: 'Servisná zmluva EduPro', desc: 'Pravidelná údržba a čistenie techniky pre vzdelávacie centrum.' },
  { id: '6', title: 'Kampaň "Lokálne Vianoce"', desc: 'Vizuál a promo materiály pre vianočné trhy.' },
  { id: '7', title: 'Workstation pre architektov', desc: 'Stavba high-end PC zostáv pre CAD/BIM systémy.' },
  { id: '8', title: 'Gala večer Priemyselnej komory', desc: 'Výzdoba, osvetlenie a koordinácia večera.' },
  { id: '9', title: 'Start-up Promo Balík', desc: 'Kompletný launch balík pre technologický startup.' }
];

async function generateImage(prompt, outputFilename) {
  // Using Imagen 4.0 via REST API
  const modelName = "imagen-3.0-generate-001"; // Fallback
  // Checking available models showed imagen-4.0-generate-001
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  
  console.log(`🎨 Generujem obrázok pre: "${prompt}"...`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        instances: [{ prompt: prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "16:9" // Or "1:1" depending on need
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    // Adjust parsing based on actual Imagen API response structure
    // Usually predictions[0].bytesBase64Encoded or similar
    if (!data.predictions || !data.predictions[0] || !data.predictions[0].bytesBase64Encoded) {
      console.log("Full response:", JSON.stringify(data, null, 2));
      throw new Error("Invalid response format from API");
    }

    const base64Image = data.predictions[0].bytesBase64Encoded;
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
  console.log("🚀 Spúšťam generovanie obrázkov...");
  
  // Generate for Services
  for (const service of services) {
    const prompt = `Professional photography of ${service.title}, ${service.desc}, modern corporate aesthetic, high resolution, photorealistic, 8k`;
    await generateImage(prompt, `services/${service.id}.jpg`);
  }

  // Generate for Realizations
  for (const realization of realizations) {
    const prompt = `Professional photography of ${realization.title}, ${realization.desc}, realistic event or office setting, high quality, 8k`;
    await generateImage(prompt, `realizations/${realization.id}.jpg`);
  }
  
  console.log("🏁 Hotovo!");
}

main();

