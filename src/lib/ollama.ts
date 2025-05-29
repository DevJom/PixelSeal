export async function generateWithOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llava',
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response from Ollama');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating with Ollama:', error);
    throw error;
  }
} 