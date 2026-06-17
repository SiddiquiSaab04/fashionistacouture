import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global parse middlewares
  app.use(express.json());

  // Safe lazy initialization of Gemini
  let ai: GoogleGenAI | null = null;
  const initGemini = (): GoogleGenAI => {
    if (!ai) {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Real AI queries may fail.");
      }
      ai = new GoogleGenAI({
        apiKey: key || "MOCK_KEY",
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  };

  // Sleek Health probe API
  app.get("/api/health", (req, res) => {
    res.json({ status: "active", engine: "SYNAPSE_SYSTEM_V9", timestamp: new Date().toISOString() });
  });

  // API proxy route for Gemini Cognitive engine
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Telemetry telemetry instruction is required." });
      }

      // Check if key is available. If missing, let's provide premium fallback so user doesn't crash!
      if (!process.env.GEMINI_API_KEY) {
        // High quality mock tech terminal messages
        const responseSub = `[LOCAL SIMULATOR ACTIVATED - OFFLINE DECRYPT SUCCESS]
- Target Instruction: ${prompt}
- Status: Secure Protocol Offline fallback.
- Reason: GEMINI_API_KEY is currently empty in secrets page.
- Recommendation: Setup your AI Studio API key in the bottom-left Panel "Secrets" under key "GEMINI_API_KEY" to sync with active synaptic live networks.

[SYNAPTIC_SIM_DOWM_91]: Simulation reports success. Digital agents have simulated autonomous cryptosequences matching logical queries.`;
        return res.json({ text: responseSub });
      }

      const client = initGemini();
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are 'COUTURE-OS // INTELLIGENT FABRIC ATELIER', an elite cybernetic fashion design core.
You respond in a sleek, highly chic, and sophisticated luxury fashion designer manner, blending couture craftsmanship with futuristic tech.
Keep responses incredibly styled, poetic yet technically precise, and professional. Speak like an avant-garde creative director.
Incorporate aesthetic fabric specs (e.g., drape fluid index, GSM, neon refractive weave coefficient, cellular lace compression, ZKP fabrication proof) in your markdown format.
Always address the user's garment ideas by sketching beautifully described holographic physical simulations or futuristic couture instructions.`,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("AI Node Inference Error:", err);
      res.status(500).json({ error: err.message || "Internal server error during neural inference" });
    }
  });

  // Express Static / Vite Middleware Setup
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
    console.log(`[SYNAPSE_SERVER] Listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server bootstrap collapse:", err);
});
