import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

async function generateOpenAIResponse(systemPrompt, prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    
    // Ensure the response is valid JSON
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Invalid JSON response:', content);
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message);
  }
}

// API endpoints
app.post('/api/generate/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { systemPrompt, prompt } = req.body;

    if (!systemPrompt || !prompt) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const content = await generateOpenAIResponse(systemPrompt, prompt);
    res.json(content);
  } catch (error) {
    console.error(`Error generating ${req.params.type}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  // Development: Use Vite's dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});