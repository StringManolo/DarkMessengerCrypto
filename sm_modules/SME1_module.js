// SME1 stands for StringManoloEncryption1  
import { CSPRNG } from "./CSPRNG_module.js";
import { KD_SHA } from "./KD_SHA_module.js";
import { PADDING_923, REM_PADDING_923 } from "./PADDING_923.js";
import { XOR } from "./XOR_module.js";

const useDebug = true;
let debugCounter = 0;
const debug = (text) => {
  if (useDebug) {
    console.log(`[debug-${++debugCounter}]${text}[/debug-${debugCounter}]`);
  }
}


const generateKey = (size) => {
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

  let generatedPassword = "";

  while (generatedPassword.length < size) {
    const numericString = CSPRNG(size + 1);
    generatedPassword += numbersToCharacters(numericString);
  }

  return generatedPassword.substring(0, size);
};




const SME1 = (plaintext) => {
  // STEP 1: generate a padding of a random length
  const minPadding = (+CSPRNG(2) + 101) * (+CSPRNG(1) + 1) / 3; // Increase the minimum padding for short plaintexts (random number between 101 and 200 * random number between 1 and 10
  const paddingSize = (plaintext.length / 100) * (+CSPRNG(1) + +CSPRNG(1) + 1) + minPadding // Random size between 1%-19% of the text to encrypt + a Random minimum size
  const padding = PADDING_923(paddingSize);

  // STEP 2: Generate a KEY the same size of the plaintext + random size padding
  //const privKey = generateKey(plaintext.length + paddingSize + 1); // NOTICE!!! If you use a shorter key than the FULL SIZE, the key can be extracted from the ciphertext cuz padding bytes are not random.  
  let privKey = "admin" // generateKey(1);
const debugKey = privKey;
  privKey = KD_SHA(privKey, plaintext.length + paddingSize + 1);



  let encryptedText = XOR(plaintext + padding, privKey);

  debug(`plaintext size: ${plaintext.length}
    plaintext: ${plaintext}

    padding Exp Size: ${paddingSize}
    padding size: ${padding.length}
    padding: [[${padding}]]

    privkey size: ${debugKey.length}
    privkey: [[${debugKey}]]

    derikey size: ${privKey.length}
    derikey: [[${privKey}]]

    encryptedText size: ${encryptedText.length}
    encryptedText: [[${Buffer.from(encryptedText).toString("base64")}]]
  `);

  return [ encryptedText, privKey ];
}

const DECRYPT_SME1 = (encryptedText, privKey) => {
  const unxored = XOR(encryptedText, privKey);
  debug(`Unxored: ${unxored}`);
  
  const noPadding = REM_PADDING_923(unxored.toString());
  debug(`No padding: ${noPadding}`);

  return noPadding;
}

const plaintext = "Hello World!" // Buffer.from("Hello World! ").toString("base64")
const [ encrypted, key ] = SME1(plaintext);
const decrypted = DECRYPT_SME1(encrypted, key);



