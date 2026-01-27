import express from "express";
import axios from "axios";

const app = express();

app.get("/api/colors", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api-veen-e.ewipro.com/v1/webAPI/",
      {
        action: "getColourCodes",
        filters: [{ popularColoursOnly: true }],
        start: 0,
        limit: 5000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic C6zfkhf2GgnDzaQkVLy8kJE4qmn8A4jhN5QLjCYB",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
