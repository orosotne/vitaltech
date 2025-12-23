import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('🚀 Spúšťam konverziu HTML vizitky do PDF...');
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, '..', 'BUSINESS CARDS', 'web-version', 'card.html');
  // Handle Windows paths correctly for file protocol
  const fileUrl = 'file://' + htmlPath.replace(/\\/g, '/');

  console.log(`📄 Načítavam: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Standard business card size: 85mm x 55mm
  const pdfPath = path.join(__dirname, '..', 'BUSINESS CARDS', 'web-version', 'peter_cincura_vector_card.pdf');

  await page.pdf({
    path: pdfPath,
    width: '85mm',
    height: '55mm',
    printBackground: true,
    pageRanges: '1'
  });

  console.log(`✅ Vektorové PDF uložené: ${pdfPath}`);

  await browser.close();
})();
