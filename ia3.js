(async () => {
  const prompt = prompt("Digite sua pergunta para a OpenRouter:");
  if (!prompt) return;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // ou outro modelo disponível no OpenRouter
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      throw new Error("Resposta inesperada da API");
    }

    alert(data.choices[0].message.content);
  } catch (err) {
    alert("Erro: " + err.message);
  }
})();
