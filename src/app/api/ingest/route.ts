import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Interface for knowledge entry
interface KnowledgeEntry {
  id: string;
  text: string;
  category: string;
}

// Function to generate embeddings using Gemini
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const embeddings = [];
  
  for (const text of texts) {
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    embeddings.push(embedding.values);
  }
  
  return embeddings;
}

export async function GET() {
  try {
    // Read the knowledge base
    const knowledgePath = path.join(process.cwd(), 'data', 'knowledge.json');
    const knowledgeData = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
    
    // Process each category
    const allEntries: KnowledgeEntry[] = [];
    Object.values(knowledgeData).forEach((entries) => {
      for (const entry of entries as KnowledgeEntry[]) {
        allEntries.push({
          id: entry.id,
          text: entry.text,
          category: entry.category
        });
      }
    });

    // Generate embeddings for all entries using Gemini
    const texts = allEntries.map(entry => entry.text);
    const embeddings = await generateEmbeddings(texts);

    // Create the embeddings data
    const embeddingsData = allEntries.map((entry, index) => ({
      id: entry.id,
      text: entry.text,
      category: entry.category,
      embedding: embeddings[index]
    }));

    // Save embeddings to a JSON file
    const embeddingsPath = path.join(process.cwd(), 'data', 'embeddings.json');
    fs.writeFileSync(embeddingsPath, JSON.stringify(embeddingsData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: `Successfully ingested ${allEntries.length} entries using Gemini embeddings`,
      entries: allEntries.length,
      savedTo: 'data/embeddings.json'
    });

  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
