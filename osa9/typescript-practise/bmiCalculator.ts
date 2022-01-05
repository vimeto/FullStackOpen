/* interface ParsedHeightAndWeight {
  height: number;
  weight: number;
}
 */
/* const parseArgumentsBmi = (args: Array<string>): ParsedHeightAndWeight =>  {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
}; */

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi < 16) return 'Underweight (Severe thinness)';
  else if (bmi < 17) return 'Underweight (Moderate thinness)';
  else if (bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight (Pre-obese)';
  else if (bmi < 35) return 'Obese (Class 1)';
  else if (bmi < 40) return 'Obese (Class 2)';
  else return 'Obese (Class 2)';
};

/* try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errorMessage = 'Something went wrong';
  if (e instanceof Error) {
    errorMessage += ', Error: ' + e.message;
  }
  console.log(errorMessage);
} */