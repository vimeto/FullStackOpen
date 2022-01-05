import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ExercisesRequestData {
  daily_exercises: Array<number>;
  target: number;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    try {
      const bmi = calculateBmi(height, weight);
      res.send({ weight, height, bmi });
    }
    catch (e: unknown) {
      let errorMessage = 'Something went wrong';
      if (e instanceof Error) {
        errorMessage += ', Error: ' + e.message;
      }
      res.status(400).json({ error: errorMessage });
    }
  }
  else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req: Request<unknown, unknown, ExercisesRequestData>, res: Response) => {
  try {
    const daily_exercises: Array<number> = req.body.daily_exercises;
    const target = req.body.target;
    if (!daily_exercises || !target) {
      res.status(400).json({ error: "parameters missing" });
    } else if (isNaN(Number(target)) || daily_exercises.map(d => Number(d)).some(d => isNaN(d))) {
      res.status(400).json({ error: "malformatted parameters" });
    }
    else {
      const obj = calculateExercises(daily_exercises, target);
      res.send(obj);
    }
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong';
    console.log(e);
    if (e instanceof Error) {
      errorMessage += ', Error: ' + e.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});