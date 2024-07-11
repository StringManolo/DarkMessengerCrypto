// SME1 stands for StringManoloEncryption1  
import { CSPRNG } from "./CSPRNG_module.js";

const useDebug = true;
let debugCounter = 0;
const debug = (text) => {
  if (useDebug) {
    console.log(`[debug-${++debugCounter}]${text}[/debug-${debugCounter}]`);
  }
}

const SME1 = (plaintext) => {
  // STEP 1: Generate a KEY the same size of the plain text.


  const randomNumber = CSPRNG(plaintext.length);
  debug(`Random Number: ${randomNumber}`);
  debug(`plaintext size: ${plaintext.length}\nrandomNumber size: ${randomNumber.toString().length}`);
}

const plaintext = "Hello World!";
SME1(plaintext);

