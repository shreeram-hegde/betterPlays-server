import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api";

const getGames = async (req, res) => {
  try {
    const { search } = req.query;
    // Optional query parameters from frontend
    const { dates = "2025-06-01,2025-12-31", ordering = "-added,-released" } =
      req.query;

    let response;
    if (search) {
      console.log("with search");
      response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
          key: process.env.RAWG_API_KEY,
          search,
          ordering,
        },
      });
    } else {
      console.log("without search");
      response = await axios.get(`${RAWG_BASE_URL}/games`, {
        params: {
          key: process.env.RAWG_API_KEY,
          dates,
          ordering,
          page_size: 30,
        },
      });
    }
    res.json(response.data);
  } catch (err) {
    console.error("RAWG API error:", err.message);
    res.status(500).json({ error: "Failed to fetch games from RAWG" });
  }
};

export default getGames;
