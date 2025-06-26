(async () => {
  const pergunta = prompt("Digite sua pergunta:");
  if (!pergunta) return;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
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

  const j = await r.json();
  alert(j.choices[0].message.content);
})();
