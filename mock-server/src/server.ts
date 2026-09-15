import cors from 'cors';
import express, { Request, Response } from 'express';
import { addToFarm, findAll, removeFromFarm, resetAll } from './farmService';
import { Color } from './models';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/animals', (_req: Request, res: Response) => {
  res.json(findAll());
});

app.post('/api/v1/animals', (req: Request, res: Response) => {
  const { name, favoriteColor } = req.body as { name?: string; favoriteColor?: Color };

  if (!name || !favoriteColor) {
    res.status(400).json({ message: 'name and favoriteColor are both required' });
    return;
  }

  const animal = addToFarm(name, favoriteColor);
  res.status(201).json(animal);
});

app.delete('/api/v1/animals/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const removed = removeFromFarm(id);

  if (!removed) {
    res.status(404).json({ message: `No animal with id ${id}` });
    return;
  }

  res.status(204).send();
});

// NOTE: test-only. Lets Playwright reset to a clean slate between tests instead of accumulating
// animals and barns across runs. Not part of the "real" product API.
app.post('/api/v1/test/reset', (_req: Request, res: Response) => {
  resetAll();
  res.status(204).send();
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`Farm mock server listening on http://localhost:${PORT}`);
});
