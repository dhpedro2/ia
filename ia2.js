(async () => {
  const pergunta = prompt("HAHAH:");
  if (!pergunta) return;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: pergunta }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
      throw new Error("Resposta inesperada da API");
    }

    alert(data.choices[0].message.content);
  } catch (err) {
    alert("Erro: " + err.message);
  }
})();
