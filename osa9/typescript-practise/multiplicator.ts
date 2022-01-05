type Operation = 'multiply' | 'add' | 'divide';
interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues =>  {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
};

const calculator = (a: number, b: number, op: Operation = 'multiply'): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide');
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculator(value1, value2));
} catch (e: unknown) {
  let errorMessage = 'Something went wrong';
  if (e instanceof Error) {
    errorMessage += ' Error: ' + e.message;
  }
  console.log(errorMessage);
}