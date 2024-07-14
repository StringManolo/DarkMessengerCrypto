const XOR = (plaintext, key, mode="normal") => {
  
  /*console.log(`

  OP ENTRADA: ${mode}

  XOR TEXT SIZE: ${plaintext.length}
  TYPEOF: ${typeof plaintext}
  XOR ENTRA TEXT: [[${"OMITED" || plaintext}]]

  XOR KEY SIZE: ${key.length}
  TYPEOF: ${typeof key}
  XOR ENTRA KEY: [[${"OMITED" || key}]]
`);*/


  const keyBuffer = Buffer.from(key);
  const plaintextBuffer = Buffer.from(plaintext);

/*
  console.log(`
  POST-CONVERSION

  TEXT HEX SIZE: ${plaintext.toString("hex").length}
  KEY HEX SIZE: ${key.toString("hex").length}
  XOR TEXT BUFFER SIZE: ${plaintextBuffer.length}
  XOR TEXT BUFFER HEX SIZE: ${plaintextBuffer.toString('hex').length}
  XOR KEY BUFFER SIZE: ${keyBuffer.length}
  XOR KEY BUFFER HEX SIZE: ${keyBuffer.toString('hex').length}
`);
*/

  const encryptedBuffer = Buffer.alloc(plaintextBuffer.length);

  /* SECURITY CHECK: */
  if (plaintextBuffer.length > keyBuffer.length && mode !== "bypass") throw `For security, using a key shorter than the plaintext is not allowed. This for general security and IMPORTANT: Padding module use fixed bytes. If you use a short key like "k", anyone can xor a random byte for example " at the end of the encrypted text with the known padding byte "a" to extract the key "k". Id you going to disable this message to allow for short key encryptions, make sure to stop using fixed bytes for padding. If the key is random and long, using fixed bytes for padding does not matter at all. DataLength: [${plaintextBuffer.length}]. KeyLength: [${keyBuffer.length}]`

  for (let i = 0; i < plaintextBuffer.length; i++) {
    encryptedBuffer[i] = plaintextBuffer[i] ^ keyBuffer[i % keyBuffer.length];
 /*   
    console.log(`[[[XOR DEBUG]]]
1. encryptedBuffer[i] = plaintextBuffer[i] ^ keyBuffer[${i % keyBuffer.length}];
2. encryptedBuffer[${i}] = ${plaintextBuffer[i]} ^ ${keyBuffer[i % keyBuffer.length]};
3. encryptedBuffer[${i}] = ${String.fromCharCode(plaintextBuffer[i])} ^ ${String.fromCharCode(keyBuffer[i % keyBuffer.length])};
4. encryptedBuffer[${i}] = ${plaintextBuffer[i] ^ keyBuffer[i % keyBuffer.length]};
5. encryptedBuffer[${i}] = ${String.fromCharCode(plaintextBuffer[i] ^ keyBuffer[i % keyBuffer.length])};
[[[XOR DEBUG]]]`);
 
*/
  }

 /* 
  console.log(`

  OP SALIDA: ${mode}

  XOR BUFFER SIZE: ${encryptedBuffer.length}
  XOR SALE BUFFER: [[${encryptedBuffer}]]
`);
*/

  return encryptedBuffer;
};


export { XOR};
