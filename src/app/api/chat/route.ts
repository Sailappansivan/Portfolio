import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Interface for embeddings data
interface EmbeddingData {
  id: string;
  text: string;
  category: string;
  embedding: number[];
}

// Function to generate embeddings using Gemini
async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Function to generate text using Gemini
async function generateText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Function to calculate cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Function to find similar documents
function findSimilarDocuments(queryEmbedding: number[], embeddingsData: EmbeddingData[], topK: number = 2) {
  const similarities = embeddingsData.map(item => ({
    ...item,
    similarity: cosineSimilarity(queryEmbedding, item.embedding)
  }));
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ 
        success: false, 
        error: 'Query is required' 
      }, { status: 400 });
    }

    // Load embeddings data
    const embeddingsPath = path.join(process.cwd(), 'data', 'embeddings.json');
    if (!fs.existsSync(embeddingsPath)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Embeddings not found. Please run /api/ingest first.' 
      }, { status: 400 });
    }

    const embeddingsData: EmbeddingData[] = JSON.parse(fs.readFileSync(embeddingsPath, 'utf8'));

    // Embed the query using Gemini
    const queryEmbedding = await generateEmbedding(query);

    // Find similar documents
    const similarDocs = findSimilarDocuments(queryEmbedding, embeddingsData, 2);

    // Extract context from search results
    const context = similarDocs.map(doc => doc.text).join('\n\n');

    // Create system prompt
    const systemPrompt = `You are Sailappan's AI bro. Answer casually but informatively based on the following context about Sailappan. Keep responses conversational and engaging, but always accurate to the information provided.

Context about Sailappan:
${context}

Remember to:
- Be friendly and casual in tone
- Provide specific details about Sailappan's skills, projects, and experience
- If asked about something not in the context, politely redirect to what you do know
- Keep responses concise but informative
- Use emojis occasionally to keep the tone light

User question: ${query}

Please provide a helpful and engaging response:`;

    // Generate response using Gemini
    const response = await generateText(systemPrompt);

    return NextResponse.json({ 
      success: true, 
      response,
      context: similarDocs.map(doc => doc.text),
      similarities: similarDocs.map(doc => ({ id: doc.id, similarity: doc.similarity }))
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
