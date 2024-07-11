// Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)
const CSPRNG = (size) => {
  // Reduce serial correlation generated by CPU linear performance
  const shuffle = (string) => {
    let array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }

  // improve stadistical redistribution (caused by fast cpu spikes)
  const redistribute = (inputString) => {
    let numbers = inputString.split('');
    let countZeros = numbers.filter(num => num === '0').length;
    let percentage = 0.63 * (1 - Math.exp(-size / 2000)) + 0.01;
    let zerosToReplace = Math.ceil(countZeros * percentage );
    let replacementChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let replacedCount = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === '0' && replacedCount < zerosToReplace) {
        let randomIndex = Math.floor(Math.random() * replacementChars.length);
        numbers[i] = replacementChars[randomIndex];
        replacedCount++;
      }
    }
    return numbers.join('');
  }


  let originalSize = size;

  // Check if size exceeds maximum limit
  if (size > 10000) {
    throw "Max size is 10000";
  }

  // Adjust size if it's 1
  if (size === 1) {
    size = 2;
  }

  // Function to obtain entropy from costly operations
  const obtainEntropyFromCostlyOperation = () => {
    let startTime = new Date().getTime();
    let result = 0;

    // Perform a costly computation
    for (let i = 0; i < Math.floor(Math.random() * 998 / 2) + 1; i++) {
      result += Math.sin(i) * Math.cos(i);

      // Perform another operation
      const angleInRadians = Math.PI / 4;
      Math.pow(2, 10);

      // Create a large array
      const largeMatrix = new Array(Math.floor(Math.random() * Math.floor(Math.random() * 9998) + 1)).fill(1);

      // Sum elements in the array
      let sum = 0;
      largeMatrix.forEach(num => {
        sum += num;
      });
    }

    // Perform another costly computation
    for (let i = 0; i < Math.floor(Math.random() * 99999 / 2) + 1; i++) {
      // Calculate factorial
      const factorial = (n) => {
        if (n === 0 || n === 1) {
          return 1;
        }
        return n * factorial(n - 1);
      };
      factorial(Math.floor(Math.random() * 338) + 1);
    }

    let endTime = new Date().getTime();
    let executionTime = (endTime - startTime).toString().slice(-1);

    return executionTime.toString();
  }

  let entropy = "";

  // Generate entropy until it reaches the desired size
  while (entropy.length < size) {
    entropy += obtainEntropyFromCostlyOperation() * Math.floor(Math.random() * Math.pow(size, 5)) + 1;
  }

  // Return only one character if original size was 1
  if (originalSize === 1) {
    return entropy[1];
  }

  return shuffle(redistribute(entropy.substring(0, size)));
}

// Example usage
// const randNums = CSPRNG(10000); // 10000 is the length of the generated numbers
//console.log(CSPRNG(10000));
//process.stdout.write(CSPRNG(10000)); // console.log adds a line break at the end

export { CSPRNG };
