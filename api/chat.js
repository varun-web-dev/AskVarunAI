export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY not found in env" });
    }

    const { contents } = req.body;

    if (!contents || !Array.isArray(contents)) {
      return res.status(400).json({ error: "Invalid contents format" });
    }

    const lastUserMessage = contents[contents.length - 1]?.parts?.[0]?.text;

    if (!lastUserMessage) {
      return res.status(400).json({ error: "No user message found" });
    }

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: lastUserMessage }]
        }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
