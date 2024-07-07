#!/usr/bin/env node

import fs from "fs";
// Función para leer un archivo y devolver su contenido como Buffer
function readKeyFile(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return content;
  } catch (err) {
    console.error(`Unable to read ${filePath}:`, err);
    return null;
  }
}

function bufferToHex(buffer) {
  return buffer.toString('hex');
}

const publicKeyFile = 'hs_ed25519_public_key';
const secretKeyFile = 'hs_ed25519_secret_key';

const publicKeyBuffer = readKeyFile(publicKeyFile);
const secretKeyBuffer = readKeyFile(secretKeyFile);

if (publicKeyBuffer && secretKeyBuffer) {
  const publicKey = bufferToHex(publicKeyBuffer);
  const privateKey = bufferToHex(secretKeyBuffer);

  console.log(`Priv Key: ${privateKey}

Pub Key: ${publicKey}

`);

}



