

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { imageUrl } = req.body;

        const apiUrl = "https://api.lightxeditor.com/external/api/v1/remove-background";
        const apiKey = process.env.NEXT_PUBLIC_LIGHTX_API_KEY; // Store your API key in .env.local

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify({
                imageUrl: imageUrl,
                background: "white", // Customize this as needed
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to remove background. Status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in API Route:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}