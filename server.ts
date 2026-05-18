import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/checkout", (req, res) => {
    const { name, price } = req.body;
    const merchantRefNum = "01200400089";
    const paymentUrl = `https://www.instabpay.com/pay?ref=${merchantRefNum}&amount=${price}`;
    res.json({ paymentUrl });
  });

  app.post("/api/call", async (req, res) => {
    const { customerNumber } = req.body;
    const accountSid = process.env.TWILIOACCOUNTSID;
    const authToken = process.env.TWILIOAUTHTOKEN;
    
    if (!accountSid || !authToken) {
      return res.status(500).json({ error: "Twilio credentials missing" });
    }

    const client = twilio(accountSid, authToken);

    try {
      const call = await client.calls.create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: customerNumber,
        from: "+201200400094"
      });
      res.json({ message: "Call initiated", callSid: call.sid });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/whatsapp", async (req, res) => {
    const { message, customerNumber } = req.body;
    const accountSid = process.env.TWILIOACCOUNTSID;
    const authToken = process.env.TWILIOAUTHTOKEN;

    if (!accountSid || !authToken) {
      return res.status(500).json({ error: "Twilio credentials missing" });
    }

    const client = twilio(accountSid, authToken);

    try {
      const msg = await client.messages.create({
        body: message,
        from: "whatsapp:+201200400094",
        to: `whatsapp:${customerNumber}`
      });
      res.json({ message: "WhatsApp sent", sid: msg.sid });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
