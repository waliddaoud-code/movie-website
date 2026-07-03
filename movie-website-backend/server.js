import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { normalizeMedia } from "./utils/normalizeMedia.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import getCached from "./utils/getCached.js";

dotenv.config();

const app = express();
app.use(compression());

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 70, // limit each IP to 70 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});

const PORT = process.env.PORT || 5000;

app.get("/movies", limiter, async (req, res) => {
  try {
    const data = await getCached("movies-home", 60 * 60 * 2, async () => {
      const results = await Promise.allSettled([
        fetch(
          `${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=1`,
        ),
        fetch(
          `${process.env.BASE_URL}/trending/movie/day?api_key=${process.env.API_KEY}&page=1`,
        ),
        fetch(
          `${process.env.BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&page=1`,
        ),
        fetch(
          `${process.env.BASE_URL}/trending/all/week?api_key=${process.env.API_KEY}&page=1`,
        ),
      ]);
      const safeJson = async (result) => {
        if (result.status !== "fulfilled") {
          return { results: [] };
        }

        const res = result.value;

        if (!res || !res.ok) {
          return { results: [] };
        }

        const text = await res.text(); // important step

        try {
          return JSON.parse(text);
        } catch (err) {
          console.log("Invalid JSON response:", text);
          return { results: [] };
        }
      };

      const [popularRes, trendingRes, topRatedRes, trendingAllRes] =
        await Promise.all(results.map(safeJson));

      return {
        popular: popularRes.results.map(normalizeMedia),
        trending: trendingRes.results.map(normalizeMedia),
        topRated: topRatedRes.results.map(normalizeMedia),
        trendingAll: trendingAllRes.results.map(normalizeMedia),
      };
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/tvshows", limiter, async (req, res) => {
  try {
    const data = await getCached("tvshows-home", 60 * 60 * 2, async () => {
      const results = await Promise.allSettled([
        fetch(
          `${process.env.BASE_URL}/tv/popular?api_key=${process.env.API_KEY}&page=1`,
        ),
        fetch(
          `${process.env.BASE_URL}/trending/tv/day?api_key=${process.env.API_KEY}&page=1`,
        ),
        fetch(
          `${process.env.BASE_URL}/tv/top_rated?api_key=${process.env.API_KEY}&page=1`,
        ),
      ]);

      const safeJson = async (result) => {
        if (result.status !== "fulfilled") {
          return { results: [] };
        }

        const res = result.value;

        if (!res || !res.ok) {
          return { results: [] };
        }

        const text = await res.text(); // important step

        try {
          return JSON.parse(text);
        } catch (err) {
          console.log("Invalid JSON response:", text);
          return { results: [] };
        }
      };

      const [popularRes, trendingRes, topRatedRes] = await Promise.all(
        results.map(safeJson),
      );

      return {
        popular: popularRes.results.map(normalizeMedia),
        trending: trendingRes.results.map(normalizeMedia),
        topRated: topRatedRes.results.map(normalizeMedia),
      };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tv shows" });
  }
});

app.get("/tv/:id/:season", limiter, async (req, res) => {
  const { id, season } = req.params;
  try {
    const data = await getCached(
      `season-${id}-${season}`,
      60 * 60 * 24 * 7,
      async () => {
        const response = await fetch(
          `${process.env.BASE_URL}/tv/${id}/season/${season}?api_key=${process.env.API_KEY}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const seasonData = await response.json();

        return {
          episodes: seasonData.episodes,
          season_number: seasonData.season_number,
          name: seasonData.name,
        };
      },
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch season details" });
  }
});

app.get("/tv/:id", limiter, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getCached(`tv-${id}`, 60 * 60 * 24 * 2, async () => {
      const response = await fetch(
        `${process.env.BASE_URL}/tv/${id}?api_key=${process.env.API_KEY}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tv details" });
  }
});

app.get("/watch/:type", limiter, async (req, res) => {
  try {
    const { type } = req.params;

    const embedURL = JSON.parse(process.env.embedURL || "[]");

    const servers = embedURL.map((url) => {
      if (type === "tv") {
        return `${url}tv`;
      }
      return `${url}movie`;
    });

    res.json(servers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch watch servers" });
  }
});

app.get("/details/:id", limiter, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getCached(
      `details-${id}`,
      60 * 60 * 24 * 2,
      async () => {
        const response = await fetch(
          `${process.env.BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,similar`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      },
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch details" });
  }
});

app.get("/search", limiter, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const data = await getCached(
      `search-${query.toLowerCase().trim()}`,
      60 * 30, // 30 minutes
      async () => {
        const response = await fetch(
          `${process.env.BASE_URL}/search/multi?api_key=${process.env.API_KEY}&query=${encodeURIComponent(query)}&page=1`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        return {
          ...result,
          results: result.results.map(normalizeMedia),
        };
      },
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

const SELF_URL = `${process.env.RENDER_URL}/movies`;

setInterval(async () => {
  try {
    await fetch(SELF_URL);
    console.log("Self-ping successful");
  } catch (err) {
    console.error(err);
  }
}, 600000);
