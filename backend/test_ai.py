import requests
import uuid

# URL of your running FastAPI server
url = "http://127.0.0.1:8000/api/voice-pipeline"

# Generate a new session ID (optional)
session_id = str(uuid.uuid4())

payload = {
    "transcription": "Hello, my name is Amira and I have a problem with my internet",
    "history": [],           # previous conversation turns
    "mode": "local",         # indicates local LLM
    "language": "en-US",     # language of the user input
    "sessionId": session_id  # optional, to maintain memory across calls
}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()  # will raise exception for HTTP errors
    result = response.json()
    
    print("AI Response:", result.get("aiResponse"))
    print("Session ID:", result.get("sessionId"))
    print("Memory Context:", result.get("memoryContext"))
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
except Exception as e:
    print("Error:", e)
