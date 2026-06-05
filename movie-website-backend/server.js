import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import e from "express";
import { normalizeMedia } from "./utils/normalizeMedia.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/movies", async (req, res) => {
  try {
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

    res.json({
      popular: popularRes.results.map(normalizeMedia),
      trending: trendingRes.results.map(normalizeMedia),
      topRated: topRatedRes.results.map(normalizeMedia),
      trendingAll: trendingAllRes.results.map(normalizeMedia),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/tvshows", async (req, res) => {
  try {
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

    res.json({
      popular: popularRes.results.map(normalizeMedia),
      trending: trendingRes.results.map(normalizeMedia),
      topRated: topRatedRes.results.map(normalizeMedia),
    });

    console.log(trendingRes.results.map(normalizeMedia));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tv shows" });
  }
});

app.get("/watch/:type", async (req, res) => {
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

app.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,similar`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(normalizeMedia(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  console.log("Search query:", query);
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/search/multi?api_key=${process.env.API_KEY}&query=${encodeURIComponent(query)}&page=1`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    res.json({
      ...data,
      results: data.results.map(normalizeMedia),
    });
    console.log("Search results:", data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
