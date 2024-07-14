// SME1 stands for StringManoloEncryption1  
import { CSPRNG } from "./CSPRNG_module.js";
import { KD_SHA } from "./KD_SHA_module.js";
import { PADDING_FIXED, REM_PADDING_FIXED } from "./PADDING_FIXED_module.js";
import { XOR } from "./XOR_module.js";

const useDebug = false;
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
  const minPadding = Math.trunc((+CSPRNG(2) + 100) * (+CSPRNG(1) + 1) / 3); // Increase the minimum padding for short plaintexts (random number between 100 and 200 * random number between 1 and 10
  let paddingSize = Math.trunc((plaintext.length / 100) * (+CSPRNG(1) + /*+CSPRNG(1)*/ +1) + minPadding) // Random size between 1%-9% of the text to encrypt + a Random minimum size
  
//debug:
  //paddingSize = 1

  let padding = PADDING_FIXED(paddingSize);

  debug("Padding is:", padding);

  // STEP 2: Generate a KEY the same size of the plaintext + random size padding
  //const privKey = generateKey(plaintext.length + paddingSize + 1); // NOTICE!!! If you use a shorter key than the FULL SIZE, the key can be extracted from the ciphertext cuz padding bytes are not random.  
  let privKey = "admin" // generateKey(1);
const debugKey = privKey;
const decryptKey = `${privKey}+${paddingSize}`
  const ivSize = 16;
  debug(`KD_SHA("${privKey}", ${plaintext.length + paddingSize + ivSize});`);
  privKey = KD_SHA(privKey, plaintext.length + paddingSize + ivSize);

  const iv = CSPRNG(ivSize);
  const derIV = KD_SHA(iv, plaintext.length + paddingSize + ivSize);
  debug("iv:", iv);
  debug(`DerIV: ${derIV} with size ${derIV.length}. The Data size is ${privKey.length}`);
  debug(`XOR("${iv + plaintext.length + padding}", "${privKey}");`);
  let encryptedText = XOR(iv + plaintext + padding, privKey);

  debug(`Xoring again with derIV to output "random" data ...`);
  encryptedText = XOR(encryptedText, derIV);

  debug(`plaintext size: ${plaintext.length}
    plaintext: ${plaintext}

    padding Exp Size: ${paddingSize}
    padding size: ${padding.length}
    padding: [[${padding}]]

    privkey size: ${debugKey.length}
    privkey: [[${debugKey}]]

    decryptKey size: ${decryptKey.length}
    decryptKey: [[${decryptKey}]]

    derikey size: ${privKey.length}
    derikey: [[${privKey}]]

    encryptedText size: ${encryptedText.length}
    encryptedText: [[${Buffer.from(encryptedText).toString("base64")}]]
  `);

  debug(`Size of encrypted text without iv is ${encryptedText.length}`);
  return [ iv + encryptedText, decryptKey ];
}




const DECRYPT_SME1 = (encryptedText, privKey) => {
  debug("-----------------------------------\n");
  debug(`Decrypting ... `);
  const ivSize = 16;
  const splitIndex = privKey.lastIndexOf('+');
  const iv = encryptedText.substring(0, ivSize);
  debug(`Extracted IV is: ${iv}`);
  encryptedText = encryptedText.substring(ivSize, encryptedText.length);
  debug(`Size of encrypted text without iv is ${encryptedText.length}`);
  const origKey = privKey.substring(0, splitIndex);
  const paddingSize = privKey.substring(splitIndex + 1);


  debug(`KD_SHA("${origKey}", ${encryptedText.length});`);
  const internalKey = KD_SHA(origKey, encryptedText.length);
  debug(`padding size: ${paddingSize}
    deriKey size: ${internalKey.length}
    deriKey: [[${internalKey}]]
`);

  //encryptedText = Buffer.from(encryptedText, "base64");

  const derIV = KD_SHA(iv, internalKey.length);
  debug(`DerIV: ${derIV}`);
  encryptedText = XOR(encryptedText, derIV);

  debug(`XOR("${encryptedText}", "${internalKey}", "bypass");`);
  let unxored = XOR(encryptedText, /*privKey*/ internalKey, "bypass");
  debug(`Unxored: ${unxored}`);
  unxored = unxored.toString().substring(ivSize);
  debug(`Unxored no iv: ${unxored}`);
  debug(`
    plaintextWithPadding size is ${unxored.toString().length} and padding size is ${paddingSize}
`);
  const noPadding = REM_PADDING_FIXED(unxored.toString(), paddingSize);
  debug(`No padding: ${noPadding}`);

  return noPadding;
}



const plaintext = "Hello World!";
const [ encrypted, key ] = SME1(plaintext);
const decrypted = DECRYPT_SME1(encrypted, key);


console.log(`
Data: ${plaintext}
Data Size: ${plaintext.length * 8} bits

Encrypted Data: ${Buffer.from(encrypted).toString("base64")}  [Showing as B64]
Encrypted Size: ${encrypted.length * 8} bits  [Encrypted is always aprox a 1%-9% bigger than original data to don't reveal Data real size. Small data is a much bigger %]

Decryption Key: ${key}

Do decrypted data match plaintext? ${plaintext === decrypted ? "YES" : "NO"}
`);


