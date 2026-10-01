import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getGoodFirstIssues } from './services/github';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/api/issues', async (req, res) => {
  try {
    const { lang, label, q, page } = req.query;
    
    const result = await getGoodFirstIssues({
      lang: lang as string,
      label: label as string,
      q: q as string,
      page: page ? parseInt(page as string, 10) : 1
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
