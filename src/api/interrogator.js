export const callInterrogator = async (userInput, history, stage, telemetry) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userInput,
      stage,
      telemetry,
      history: history
        .filter(m => m.sender !== 'system')
        .map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }))
    })
  });

  if (!response.ok) throw new Error("The Interrogator is ghosting you.");

  const data = await response.json();
  
  // Parse the AI's JSON string into a real object
  return JSON.parse(data.choices[0].message.content);
};