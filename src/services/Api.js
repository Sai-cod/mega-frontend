// src/services/api.js

// IMPORTANT:
// Replace this IP with the IPv4 address of your RTX 5080 PC.
// Example:
// const API_URL = "http://192.168.50.12:8000";

const API_URL = "http://192.168.50.17:8000";

export async function askAgriGPT(question) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: question,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Support the response format:
    // { "response": "..." }
    // or
    // { "answer": "..." }

    const answer = data.response ?? data.answer;

    if (!answer) {
      throw new Error(
        "Backend responded successfully, but no response/answer field was found.",
      );
    }

    return answer;
  } catch (error) {
    console.error("AgriGPT API Error:", error);
    throw error;
  }
}
