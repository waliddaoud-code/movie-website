import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import e from 'express'

dotenv.config()

const app = express()

app.use(cors());



app.use(express.json());

app.get('/movies/home', async (req, res)=>{
  try {
  const [popularRes, topRatedRes, trendingRes ] = await Promise.all([
    fetch(`${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=1`),
    fetch(`${process.env.BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&page=1`),
    fetch(`${process.env.BASE_URL}/trending/all/week?api_key=${process.env.API_KEY}`),
  ]); 

  const popular = await popularRes.json();
  const topRated = await topRatedRes.json();
  const trending = await trendingRes.json();

  res.json({ popular: popular.results, topRated: topRated.results, trending: trending.results });

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch popular movies' })
  }
});














app.get('/movies/watch', async (req, res) => {
  try {
    const embedURL = JSON.parse(process.env.embedURL || "[]");


    res.json(embedURL);
  } catch (error) {
    console.error("Embed URL error:", error);
    res.status(500).json({ error: 'Failed to fetch movie videos' });
  }
});




app.listen(5000, ()=>{
  console.log('Server is running on port 5000')
})