import type { Config } from "@netlify/functions"

export default async (req: Request) => {
  if (req.method !== "POST") return Response.json({ error: "Use POST for tutor questions." }, { status: 405 })
  const apiKey = Netlify.env.get("GEMINI_API_KEY")
  if (!apiKey) return Response.json({ error: "Gemini is not connected yet. Add GEMINI_API_KEY in Netlify site environment variables, then redeploy." }, { status: 503 })

  let body: { question?: string; level?: string; subject?: string; curriculum?: string }
  try { body = await req.json() } catch { return Response.json({ error: "Please send a valid question." }, { status: 400 }) }
  const question = (body.question || "").trim()
  if (!question || question.length > 3000) return Response.json({ error: "Enter a question of 1–3000 characters." }, { status: 400 })

  const system = `You are Study Hub AI, a patient, age-appropriate school tutor. Explain step by step in clear simple language, adapt to the learner's level, give a worked example when useful, and finish with one short practice question when appropriate. Do not pretend to know a specific textbook page. If unsure, say so. Avoid asking for personal information. Curriculum: ${body.curriculum || "unspecified"}. Level: ${body.level || "unspecified"}. Subject: ${body.subject || "not specified"}.`
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ system_instruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: question }] }], generationConfig: { temperature: 0.4, maxOutputTokens: 900 } })
    })
    const data = await response.json()
    if (!response.ok) return Response.json({ error: data?.error?.message || "Gemini could not answer. Check the API key and model access." }, { status: response.status >= 500 ? 502 : 400 })
    const answer = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("\n").trim()
    return Response.json({ answer: answer || "I couldn't produce an answer. Please try rephrasing your question." })
  } catch { return Response.json({ error: "Could not reach Gemini. Please try again later." }, { status: 502 }) }
}

export const config: Config = {
  rateLimit: { action: "rate_limit", aggregateBy: "ip", windowSize: 60, windowLimit: 10 }
}
