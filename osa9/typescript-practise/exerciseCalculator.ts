interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
/* interface ParsedInputData {
  target: number;
  data: Array<number>;
} */

/* const parseArgumentsExercises = (args: Array<string>): ParsedInputData =>  {
  if (args.length < 10) throw new Error('Not enough arguments');

  for (const arg of args.slice(2)) {
    if (isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers.');
    }
  }
  return {
    target: Number(args[2]),
    data: args.slice(3).map(a => Number(a))
  };
}; */


export const calculateExercises = (data: Array<number>, target: number): exerciseResults => {
  const periodLength = data.length;
  const trainingDays = data.filter(x => x > 0).length;
  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const success = average > target;
  const rating: number = Math.round((5 * average) / (average + ((2 * target) / 3)));
  const ratingDescriptions = [
    'hopefully there\'s a mistake',
    'pretty bad...',
    'not too bad but could be better',
    'getting there, next time a tad better!',
    'awesome job, nearly perfect!',
    'perfect job!'
  ];
  const ratingDescription: string = ratingDescriptions[rating];
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  };
};

/* try {
  const { target, data } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(data, target));
} catch (e: unknown) {
  let errorMessage = 'Something went wrong';
  if (e instanceof Error) {
    errorMessage += ', Error: ' + e.message;
  }
  console.log(errorMessage);
} */