import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI(apiKey ? { apiKey } : {});
};

// 1. Generate video from image or text using Veo (veo-3.1-fast-generate-preview)
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, imageBase64, mimeType, aspectRatio } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: "GEMINI_API_KEY topilmadi. Iltimos, AI Studio Secrets panelidan API kalitingizni ulang."
      });
    }

    const ai = getAiClient();
    const targetAspectRatio = aspectRatio === '9:16' ? '9:16' : '16:9';

    const payload: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Smooth cinematic video animation of this scene with realistic motion',
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: targetAspectRatio
      }
    };

    if (imageBase64) {
      // Strip data:image/...;base64, prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
      payload.image = {
        imageBytes: cleanBase64,
        mimeType: mimeType || 'image/jpeg'
      };
    }

    const operation = await ai.models.generateVideos(payload);
    res.json({ 
      operationName: operation.name,
      model: 'veo-3.1-fast-generate-preview',
      aspectRatio: targetAspectRatio
    });
  } catch (error: any) {
    console.error('Video generation error:', error);
    res.status(500).json({ 
      error: error.message || "Video generatsiyasini boshlashda xatolik yuz berdi" 
    });
  }
});

// 2. Poll video status
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName kiritilmadi' });
    }

    const ai = getAiClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({ 
      done: updated.done || false, 
      error: updated.error || null 
    });
  } catch (error: any) {
    console.error('Video status check error:', error);
    res.status(500).json({ error: error.message || "Statusni tekshirishda xatolik" });
  }
});

// 3. Download generated video stream
app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName kiritilmadi' });
    }

    const ai = getAiClient();
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(400).json({ error: "Generatsiya qilingan video URI topilmadi" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey || '' }
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: "Video faylini yuklab olishda xatolik yuz berdi" });
    }

    res.setHeader('Content-Type', 'video/mp4');
    const arrayBuffer = await videoRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({ error: error.message || "Videoni yuklashda xatolik" });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`EduVision Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
