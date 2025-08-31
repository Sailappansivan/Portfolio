import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const embeddingsPath = path.join(process.cwd(), 'data', 'embeddings.json');
  const embeddingsExist = fs.existsSync(embeddingsPath);
  
  return NextResponse.json({ 
    status: 'ok',
    message: 'RAG Chatbot API is running with Gemini',
    endpoints: {
      ingest: '/api/ingest',
      chat: '/api/chat',
      status: '/api/status'
    },
    setup: {
      step1: 'Add GEMINI_API_KEY to .env.local',
      step2: 'Visit /api/ingest to load knowledge base',
      step3: 'Chatbot will be ready to use!'
    },
    models: {
      embeddings: 'embedding-001',
      text: 'gemini-1.5-flash'
    },
    storage: {
      type: 'JSON file',
      embeddingsFile: 'data/embeddings.json',
      embeddingsLoaded: embeddingsExist
    }
  });
}
