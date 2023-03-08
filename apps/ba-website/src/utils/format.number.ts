export const formatCurrency = (
  price?: number,
  currency?: string,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "ZAR",
    currencyDisplay: "narrowSymbol",
    ...options,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  if (!price) return "";
  return formatter.format(price);
};

/**
 * A function that takes a range and a number of values to generate
 * @param range - An array of two numbers representing the lower and upper bound of the range
 * @param n - A positive integer representing the number of values to generate
 * @returns An array of n numbers evenly spaced between the range
 * @throws An error if the range or n are invalid
 */
export const generateNumbersInRange = (
  range: [number, number],
  n: number
): number[] => {
  // Check if the range and n are valid
  if (range[0] >= range[1] || n < 1 || n > range[1] - range[0]) {
    throw new Error("Invalid input");
  }
  let result: number[] = [];
  // Calculate the step size between each value
  let step = (range[1] - range[0]) / (n + 1);
  // Loop from 1 to n and generate a value by adding the step size to the lower bound of the range
  for (let i = 1; i <= n; i++) {
    let value = roundToMillion(Math.round(range[0] + i * step));
    // Push the value to the result array
    result.push(value);
  }
  return result;
};

// A function that rounds a number to the nearest million
export const roundToMillion = (num: number) => {
  // Convert the number to a string
  let str = num.toString();
  // Get the length of the string
  let len = str.length;
  // If the length is less than or equal to 6, return the number as it is
  if (len <= 6) {
    return num;
  }
  // Otherwise, get the first digit and add zeros based on the length
  let first = str[0];
  let zeros = "0".repeat(len - 1);
  // Parse the first digit and zeros as a number
  let rounded = Number(first + zeros);
  // If the second digit is greater than or equal to 5, add one million to the rounded number
  if (str[1] >= "5") {
    rounded += Math.pow(10, len - 1);
  }
  // Return the rounded number
  return rounded;
};

/**
 * A function that takes in a maxvalue and a value and returns the percentage of the maxvalue that is the value
 * @param {number} maxvalue - The maximum possible value
 * @param {number} value - The current value
 * @returns {number} The percentage of the maxvalue that is the value, rounded to two decimal places
 * @throws {Error} If maxvalue is zero or negative
 */
export const getPercentage = (maxvalue: number, value: number): number => {
  // Check if maxvalue is zero or negative to avoid division by zero or negative percentage
  if (maxvalue <= 0) {
    throw new Error("maxvalue must be positive");
  }
  // Calculate the percentage using the formula: (value / maxvalue) * 100
  let percentage = (value / maxvalue) * 100;
  // Return the percentage rounded to two decimal places
  return Math.round(percentage * 100) / 100;
};

/**
 * A function that formats currencies to a short string
 * @param {number} amount - The amount of money
 * @returns {string} The formatted string with a suffix of k (thousand), m (million), b (billion), or t (trillion)
 */
export const formatCurrencyToShortString = (amount: number): string => {
  // Define an array of suffixes for different orders of magnitude
  const suffixes = ["", "k", "m", "b", "t"];
  // Find the index of the suffix based on the logarithm of the amount
  let index = Math.floor(Math.log10(amount) / 3);
  // Check if the index is valid and within the range of the suffixes array
  if (index >= suffixes.length) {
    throw new Error("Invalid amount");
  }
  // Divide the amount by 1000^index to get the base value
  let value = (amount || 1) / Math.pow(1000, index);
  // Return the value rounded to two decimal places and concatenated with the suffix
  return value.toFixed(0) + suffixes[index];
};

/**
 * Returns an array of six numbers based on the input array.
 * The first two elements in the resulting array are the minimum and maximum values from the input array.
 * The remaining four elements are determined by counting the frequency of each element in the input array and selecting the four most frequent elements.
 * If there are fewer than four unique elements in the input array (excluding the minimum and maximum), then all unique elements will be included in the resulting array.
 * Before processing, each element in the input array is rounded to the nearest 100000 if below 900000,
 * 1000000 if below a 15000000 and 10000000 if above 10000000.
 *
 * @param {number[]} arr - The input array of numbers
 * @returns {number[]} An array of six numbers based on the input array
 */
export const getDistributedRange = (arr: number[]): number[] => {
  let result: number[] = [];
  let roundedArr = arr.map((x) => {
    if (x < 1000000) {
      return Math.round(x / 100000) * 100000;
    } else if (x < 15000000) {
      return Math.round(x / 1000000) * 1000000;
    } else {
      return Math.round(x / 10000000) * 10000000;
    }
  });

  let min = Math.min(...arr);
  let max = Math.max(...arr);
  result.push(min - 10000);
  result.push(max + 10000);

  let counts: { [key: number]: number } = {};
  for (let i = 0; i < roundedArr.length; i++) {
    if (roundedArr[i] !== min && roundedArr[i] !== max) {
      if (counts[roundedArr[i]] === undefined) {
        counts[roundedArr[i]] = 1;
      } else {
        counts[roundedArr[i]]++;
      }
    }
  }

  let sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < sortedCounts.length && result.length < 20; i++) {
    result.push(Number(sortedCounts[i][0]));
  }

  return result.sort((a, b) => a - b);
};

/**
 * Removes all non-integer characters from the input string
 *
 * @param {string} str - The input string
 * @returns {number} A new string with all non-integer characters removed
 */
export const removeNonIntegers = (str: string): number => {
  return Number(str.replace(/\D/g, ""));
};
