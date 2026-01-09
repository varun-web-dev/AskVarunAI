import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Read API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("API key missing in environment variables");
      return res.status(500).json({ error: "API key not set" });
    }

    const { contents } = req.body;
    if (!contents || contents.length === 0) {
      return res.status(400).json({ error: "No messages provided" });
    }

    const lastMessage = contents[contents.length - 1].parts[0].text;

    // Proper Gemini API payload
    const payload = {
      input: lastMessage
    };

    // Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const text = await response.text(); // <-- important: use text first
    let data;
    try {
      data = JSON.parse(text); // convert to JSON safely
    } catch (err) {
      console.log("Failed to parse Gemini response:", text);
      return res.status(500).json({ error: "Invalid JSON from Gemini API", raw: text });
    }

    if (data.error) {
      console.log("Gemini API error:", data.error);
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json(data);

  } catch (error) {
    console.log("Server error:", error);
    res.status(500).json({ error: error.message });
  }
}
