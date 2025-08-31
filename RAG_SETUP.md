# RAG-Powered Chatbot Setup Guide (Gemini)

This guide will help you set up the personalized RAG (Retrieval-Augmented Generation) chatbot for Sailappan's portfolio website using Google's Gemini API.

## Prerequisites

1. **Gemini API Key**: You'll need a Google AI Studio API key to use Gemini embeddings and text generation
2. **Node.js**: Version 16 or higher

## Setup Steps

### 1. Install Dependencies

The required packages are already installed:
- `@google/generative-ai`: For Gemini embeddings and text generation

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=AIzaSyAksqU2uoTjYgG5x0700dNsBbfyZkUhMqs
```

To get a Gemini API key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env.local` file

### 3. Ingest Knowledge Base

Ingest the knowledge base by visiting:
```
http://localhost:3000/api/ingest
```

This will:
- Read the `data/knowledge.json` file
- Generate embeddings for all entries using Gemini `embedding-001`
- Save embeddings to `data/embeddings.json` for fast retrieval

### 4. Start the Development Server

```bash
npm run dev
```

The chatbot will now be ready to answer questions based on Sailappan's knowledge base!

## How It Works

### Knowledge Base Structure

The `data/knowledge.json` file contains structured information about:
- **About**: Personal background and interests
- **Skills**: Technical skills and technologies
- **Projects**: Detailed project descriptions
- **Experience**: Work experience and internships
- **Contact**: Contact information and links

### RAG Process

1. **User Query**: User asks a question in the chatbot
2. **Query Embedding**: The query is embedded using Gemini `embedding-001`
3. **Similarity Search**: Find the 2 most similar documents using cosine similarity
4. **Context Retrieval**: Retrieved documents are used as context
5. **Response Generation**: Gemini `gemini-1.5-flash` generates a response using the context and system prompt
6. **Response Display**: The response is displayed in the chat interface

### API Endpoints

- **GET `/api/ingest`**: Ingests knowledge base and generates embeddings
- **POST `/api/chat`**: Processes user queries and returns AI responses
- **GET `/api/status`**: Check API status and setup information

## Customization

### Adding New Information

To add new information to the chatbot:

1. Edit `data/knowledge.json` and add new entries
2. Visit `/api/ingest` to re-generate embeddings

### Modifying the System Prompt

Edit the system prompt in `/api/chat/route.ts` to change the chatbot's personality and response style.

### Styling

The chatbot uses the existing dark AI theme with neon blue/purple accents. All styling is in the `ChatbotWidget.tsx` component.

## Troubleshooting

### Common Issues

1. **Gemini API Error**: Check your API key in `.env.local`
2. **Ingestion Fails**: Ensure the `data/knowledge.json` file exists and is valid JSON
3. **Embeddings Not Found**: Run `/api/ingest` first to generate embeddings

### Debug Mode

Check the browser console and server logs for detailed error messages.

## Features

- ✅ Personalized responses based on Sailappan's knowledge
- ✅ Real-time chat interface with loading states
- ✅ Quick action buttons for common queries
- ✅ Error handling and fallback responses
- ✅ Responsive design with animations
- ✅ Dark AI theme with glowing effects
- ✅ Powered by Google's Gemini AI
- ✅ Simple JSON-based storage (no external database needed)

## Gemini Models Used

- **Embeddings**: `embedding-001` - High-quality text embeddings
- **Text Generation**: `gemini-1.5-flash` - Fast and efficient text generation

## Storage

The system uses a simple JSON file approach:
- `data/knowledge.json` - Original knowledge base
- `data/embeddings.json` - Generated embeddings (created after ingestion)

This approach eliminates the need for external databases and makes the setup much simpler!

The chatbot is now ready to provide personalized, intelligent responses about Sailappan's skills, projects, and experience using Google's powerful Gemini AI! 🚀
