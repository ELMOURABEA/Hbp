🛒 El-Bendary Pharmacy Platform

A professional e-commerce pharmacy platform built with React, Vite, TypeScript, TailwindCSS, and an integrated Express backend for APIs (Gemini AI, Twilio, Checkout).

---

🚀 Features
- **AI Pharmacist Assistant**: A smart chatbot powered by Gemini API to answer customer queries instantly.
- **Product Catalog**: Digital shop with category & price filtering.
- **Easy Stock Management**: Maintainable inventory via JSON data.
- **e-Prescription Service**: Secure upload form for prescription parsing.
- **Insurance Login System**: Specialized member portal.
- **Cart & Checkout**: Setup for integration with payment gateways.
- **Twilio API**: Support for call center & WhatsApp messaging routing.
- **Responsive UI**: High-craft frontend design with TailwindCSS & Framer Motion.

---

📂 Project Structure
```text
src/               → React frontend source code
src/components/    → Reusable UI components (Navbar, AIAssistant, etc.)
src/pages/         → Application views (Home, Shop, Prescription)
public/data/       → Inventory file (products.json)
server.ts          → Full-stack Express backend serving APIs and Vite
```

---

📦 Installation
1. Clone repo:
   ```bash
   git clone https://github.com/YOURUSERNAME/bendary-pharmacy.git
   cd bendary-pharmacy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in `.env`:
   ```env
   GEMINI_API_KEY="your_google_gemini_key"
   TWILIOACCOUNTSID="your_twilio_sid"
   TWILIOAUTHTOKEN="your_twilio_token"
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

---

🌐 Deployment
1. Set build command: `npm run build`
2. Start command: `npm start`
3. The server handles both static assets and API routes on a single port.

---

🗂️ Stock Management Guide

Products are stored in `public/data/products.json`.
Example:
```json
{
  "id": 1,
  "name": "Panadol",
  "price": 50,
  "category": "Medicines",
  "company": "GSK",
  "image": "https://images.unsplash.com/...",
  "description": "Effective pain relief."
}
```

➕ Add Product
- Add a new object in `products.json`.
- Provide an image URL.
- Redeploy → product appears in shop.

---

🔒 Security & Professional Setup
- Store API keys in environment variables on your host. NEVER expose `process.env.GEMINI_API_KEY` to the browser.
- All AI responses are proxied securely through the Express backend `server.ts`.
- Add robots.txt and sitemap.xml for SEO.

*Check `ROADMAP.md` for our scale and expansion plans.*
