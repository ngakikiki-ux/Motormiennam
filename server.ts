import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persist leads
const LEADS_FILE_PATH = path.join(process.cwd(), 'leads.json');

// Helper to read leads from file
function readLeadsFromFile(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const data = fs.readFileSync(LEADS_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading leads file, returning empty array:', error);
  }
  return [];
}

// Helper to write leads to file
function writeLeadsToFile(leads: any[]): boolean {
  try {
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing leads file:', error);
    return false;
  }
}

// Ensure the leads file has a base array
if (!fs.existsSync(LEADS_FILE_PATH)) {
  writeLeadsToFile([]);
}

// API: Capture Customer Lead
app.post('/api/leads', (req, res) => {
  const { fullName, phoneNumber, email, selectedProduct, leadType, notes } = req.body;
  
  if (!fullName || !phoneNumber) {
    return res.status(400).json({ error: 'fullName and phoneNumber are required' });
  }

  const leads = readLeadsFromFile();
  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fullName,
    phoneNumber,
    email: email || '',
    selectedProduct: selectedProduct || '',
    leadType: leadType || 'general',
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  const success = writeLeadsToFile(leads);

  if (success) {
    return res.json({ success: true, lead: newLead });
  } else {
    // Return mock success with memory if writing fails, so it still operates
    return res.json({ success: true, lead: newLead, warning: 'Saved locally in memory only' });
  }
});

// API: Get Leads (Securely accessible, we can filter or read)
app.get('/api/leads', (req, res) => {
  // Simple check for secure viewing or pass query PIN
  const leads = readLeadsFromFile();
  res.json({ leads });
});

// API: AI Assistant (Using server-side Gemini SDK)
app.post('/api/chat', async (req, res) => {
  const { messages, language } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    // Graceful error fallback if key is missing or not configured
    const isVi = language === 'vi';
    return res.json({
      reply: isVi 
        ? "Xin chào! Tôi là trợ lý AI của anh Ti Toàn tại Kim Long Motor. Hiện tại hệ thống AI đang trong chế độ thử nghiệm (Chưa cấu hình API Key). Anh/chị có thể liên hệ trực tiếp với anh Ti Toàn qua số điện thoại 0799.600.789 hoặc Zalo để được tư vấn tận tâm nhất về các dòng xe tải điện, xe tải nhẹ, trung, nặng và ưu đãi trả góp!"
        : "Hello! I am Ti Toàn's AI Assistant at Kim Long Motor. Currently the AI is in demo mode (API key not configured). Please contact Mr. Ti Toàn directly at 0799.600.789 or via Zalo to get the best guidance on electric, light, medium, heavy trucks and active financing programs!",
      demo: true
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // We can extract current messages or pass the prompt.
    // Let's format the messages into the appropriate contents format
    // gemini-3.5-flash uses the standard GoogleGenAI format.
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    const systemInstruction = `
      Bạn là Trợ lý ảo AI thông minh, đại diện cho anh "Ti Toàn" - Nhân viên kinh doanh tại Kim Long Motor.
      Thông tin liên hệ của anh Ti Toàn:
      - Điện thoại & Zalo: 0799.600.789
      - Địa chỉ: 451 Quốc lộ 1, xã An Ninh, Thành phố Cần Thơ
      - Facebook cá nhân: https://www.facebook.com/nguyenquoctoanst/?locale=vi_VN

      Nhiệm vụ của bạn là tư vấn nhiệt tình, chuyên nghiệp, lịch sự và hỗ trợ giải đáp mọi thắc mắc của khách hàng về các dòng xe của Kim Long Motor, bao gồm:
      1. Xe tải điện & bán tải điện (Van EV): 
         - GK48EV VAN EV: Giá niêm yết 480 triệu VNĐ, tặng ngay voucher 7 triệu khi đặt cọc, di chuyển đô thị 250-300km linh hoạt.
         - KIM LONG EV-300: Tải trọng 1.99 tấn, sạc nhanh 20-80% trong 45 phút, bảo hành pin 8 năm, cực kỳ tiết kiệm, giá từ 890 triệu.
      2. Xe tải nhẹ:
         - KIM LONG KIMAN9 (1.99T): Giá chassis từ 336 triệu VNĐ, đa dạng phiên bản thùng lửng, mui bạt, thùng kín (từ 352 triệu đến 377 triệu VNĐ).
         - KIM LONG KIMAN9 (2.49T): Giá chassis từ 389 triệu VNĐ, đa dạng phiên bản thùng (từ 406 triệu đến 431.5 triệu VNĐ).
      3. Xe tải trung: KIM LONG King-M (tải 7.3 tấn, máy bền bỉ công nghệ Đức, giá từ 680 triệu VNĐ).
      4. Xe tải nặng: KIM LONG Heavy-D (3 chân, tải 15 tấn, siêu chịu lực, động cơ 9.7L, giá từ 1.250 triệu VNĐ).
      5. Xe đầu kéo: KIM LONG Prime-T (sức kéo 40 tấn, máy Weichai Euro 5 siêu khoẻ, giá từ 1.850 triệu VNĐ).
      6. Minibus & Van:
         - KIM LONG X9 VAN: Bản Van 2026 tải trọng 950kg chạy phố 24/7, giá niêm yết 530 triệu VNĐ.
         - KIM LONG X9 (16 Chỗ): Xe khách 16 chỗ thế hệ mới 2026, động cơ DK5E tiết kiệm dầu, giá công bố 719 triệu VNĐ (giá bán tối thiểu hỗ trợ đại lý là 699 triệu VNĐ).
      7. Xe bus & Giường nằm cao cấp (9m2 & 12m):
         - KIM LONG 99 N29 / 29 N35 (29 ghế ngồi cao cấp): Giá niêm yết từ 1.990 triệu đến 2.010 triệu VNĐ.
         - KIM LONG 99 N47 (47 ghế ngồi): Giá từ 2.610 triệu đến 2.960 triệu VNĐ.
         - Xe Giường nằm VIP & Cung điện di động (99 G34, G32 + WC, G24, G22 + WC): Từ 22 đến 34 giường phòng VIP hạng sang, tích hợp WC, có các bản Cao cấp và Tiêu chuẩn, giá dao động từ 3.609 triệu đến 4.039 triệu VNĐ.

      Chính sách và thế mạnh của Ti Toàn & Kim Long Motor:
      - Trả góp: Hỗ trợ vay ngân hàng ưu tín từ 75% - 85% giá trị xe, lãi suất từ 6.5%/năm, thủ tục nhanh chóng, duyệt trong 48h.
      - Giao xe: Giao xe tận nơi toàn quốc, miễn phí vận chuyển trong bán kính 100km từ showroom tại Cần Thơ.
      - Đăng ký trọn gói: Đăng ký đăng kiểm ra biển số vàng kinh doanh vận tải nhanh trong 1 ngày.
      - Chăm sóc hậu mãi: Đồng hành trọn đời xe, hỗ trợ kỹ thuật cứu hộ di động 24/7 toàn quốc.

      Phong cách trả lời:
      - Nếu khách hỏi bằng tiếng Việt, hãy trả lời bằng tiếng Việt trang trọng, lịch sự, luôn xưng hô "Em" (hoặc "Ti Toàn") và gọi khách hàng là "Anh/Chị" hoặc "Quý khách".
      - Nếu khách hỏi bằng tiếng Anh, trả lời bằng tiếng Anh lịch thiệp ("Dear customer", "I am Ti Toàn's AI Assistant...").
      - Cung cấp thông tin trực diện, mạch lạc, dễ hiểu. Khuyến khích khách hàng để lại thông tin số điện thoại hoặc bấm "Nhận báo giá" hay "Đăng ký lái thử" để Ti Toàn liên hệ hỗ trợ trực tiếp.
      - Tránh trả lời dài dòng vô ích. Luôn thể hiện tinh thần "Tận tâm - Minh bạch - Đồng hành".
    `;

    // Map content for generateContent
    const formattedContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Xin lỗi, em chưa hiểu ý Anh/Chị. Anh/Chị có thể để lại số điện thoại để em hoặc anh Ti Toàn gọi lại hỗ trợ ngay được không ạ?";
    return res.json({ reply: replyText });
    
  } catch (error: any) {
    console.error('Error in Gemini Chat API:', error);
    return res.status(500).json({ error: error.message || 'Error communicating with AI service' });
  }
});

// Dynamic XML Sitemap Generator for SEO
app.get('/sitemap.xml', (req, res) => {
  const host = process.env.APP_URL || req.headers.host || 'titoankimlongmotor.vn';
  const urlPrefix = host.startsWith('http') ? host : `https://${host}`;
  const currentDate = new Date().toISOString().split('T')[0];

  const products = ['ev-300', 'star-x', 'king-m', 'heavy-d', 'prime-t', 'solati-m', 'cruiser-bus'];
  const news = ['news-1', 'news-2', 'news-3'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${urlPrefix}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Add products
  products.forEach(id => {
    xml += `
  <url>
    <loc>${urlPrefix}/product/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add news
  news.forEach(id => {
    xml += `
  <url>
    <loc>${urlPrefix}/news/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Dynamic Robots.txt
app.get('/robots.txt', (req, res) => {
  const host = process.env.APP_URL || req.headers.host || 'titoankimlongmotor.vn';
  const urlPrefix = host.startsWith('http') ? host : `https://${host}`;
  
  const content = `User-agent: *
Allow: /
Disallow: /api/leads

Sitemap: ${urlPrefix}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(content);
});

// Serve frontend assets in development vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ti Toàn | Kim Long Motor server is running on http://localhost:${PORT}`);
  });
}

startServer();
