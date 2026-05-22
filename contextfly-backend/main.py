import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("ContextFlyLogger")

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logger.error("❌ GEMINI_API_KEY is missing from your .env file!")
    client = None
else:
    logger.info("✅ Google GenAI Client successfully initialized.")
    client = genai.Client(api_key=api_key)

# WE UPDATED THIS: It now accepts 'url' directly to match your extension
class AnalysisRequest(BaseModel):
    text: str
    url: str

@app.post("/api/v1/analyze")
async def analyze_text(request: AnalysisRequest):
    logger.info(f"Received request for URL: {request.url}")
    
    if not client:
        raise HTTPException(status_code=500, detail="API Key missing on server.")

    try:
        prompt = f"""
        Analyze the following text captured from a webpage. 
        Provide a hyper-concise, clear explanation with definition, practical usage, or fix.
        Use clean Markdown formatting. Bold key terms. Format code blocks beautifully.
        
        Source Page: {request.url}
        Captured Content: {request.text}
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        # WE UPDATED THIS: It returns 'preview' exactly how your frontend expects it
        return {
            "status": "success",
            "model_used": "gemini-2.5-flash",
            "preview": response.text.strip()
        }

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))