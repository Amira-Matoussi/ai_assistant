import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("🔥 ElevenLabs Streaming API route called")
    
    const { text, voice_id, language } = await request.json()
    console.log(`📝 Text: ${text.substring(0, 50)}...`)
    console.log(`🎤 Voice ID: ${voice_id}`)
    console.log(`🌍 Language: ${language}`)
    
    if (!process.env.ELEVENLABS_API_KEY) {
      console.error("❌ No ElevenLabs API key found")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }
    
    console.log("🚀 Calling ElevenLabs Streaming API...")
    
    // Use the streaming endpoint instead of regular TTS
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        // Use Flash model for ultra-low latency (~75ms inference)
        model_id: "eleven_flash_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.5,
          use_speaker_boost: true
        },
        // Streaming-specific options
        output_format: "mp3_22050_32", // Lower quality but faster streaming
        optimize_streaming_latency: 4, // Maximum latency optimization
      }),
    })
    
    console.log(`📡 ElevenLabs streaming response status: ${response.status}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ ElevenLabs API error:", response.status, errorText)
      return NextResponse.json({ error: `ElevenLabs API error: ${errorText}` }, { status: response.status })
    }
    
    if (!response.body) {
      console.error("❌ No response body received")
      return NextResponse.json({ error: "No audio stream received" }, { status: 500 })
    }
    
    console.log("✅ Streaming audio response received, creating pass-through stream...")
    
    // Create a streaming response with immediate chunk forwarding
    const stream = new ReadableStream({
      start(controller) {
        const reader = response.body!.getReader()
        
        function pump(): Promise<void> {
          return reader.read().then(({ done, value }) => {
            if (done) {
              console.log("✅ Audio stream completed")
              controller.close()
              return
            }
            
            // Immediately enqueue chunks without buffering
            controller.enqueue(value)
            return pump()
          }).catch(error => {
            console.error("❌ Stream error:", error)
            controller.error(error)
          })
        }
        
        // Start pumping immediately
        return pump()
      }
    })
    
    return new Response(stream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
        // Enable streaming
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
    
  } catch (error) {
    console.error("❌ Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

