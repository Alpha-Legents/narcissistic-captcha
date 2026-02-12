export const callInterrogator = async (userInput, history, stage, telemetry) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput, history, stage, telemetry }),
  });

  if (!response.ok) {
    return { 
      messages: ["I've decided to ignore you. Check your connection."], 
      isFinal: false 
    };
  }

  const data = await response.json();
  // Ensure we return an object even if the AI response is weird
  return {
    messages: data.messages || [data.text] || ["..."],
    isFinal: data.isFinal || false,
    winCondition: data.winCondition || false,
    verdict: data.verdict || ""
  };
};