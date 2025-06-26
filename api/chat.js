import fetch from "node-fetch";

// Sua chave direto no código, sem .env (EXPOSIÇÃO TOTAL)
const OPENROUTER_API_KEY = "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";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { messages, model } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages deve ser um array" });
  }

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({ model: model || "gpt-4o-mini", messages })
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
