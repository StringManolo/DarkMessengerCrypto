#!/usr/bin/env node

import { CSPRNG } from "../CSPRNG_module.js";

const numbersToCharacters = (numericString) => {
  let binaryString = '';

  for (let i = 0; i < numericString.length; i++) {
    const digit = parseInt(numericString.charAt(i), 10);
    const binary = digit.toString(2).padStart(4, '0'); 
    binaryString += binary;
  }

  let password = '';
  for (let j = 0; j < binaryString.length; j += 8) {
    const byte = binaryString.substr(j, 8);
    const asciiCode = parseInt(byte, 2);
    if (asciiCode > 32 && asciiCode < 127) { 
      password += String.fromCharCode(asciiCode);
    }
  }

  return password;
};

const numericString = CSPRNG(10000);
const generatedPassword = numbersToCharacters(numericString);
console.log(generatedPassword);

