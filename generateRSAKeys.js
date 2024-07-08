#!/usr/bin/env node

import crypto from "crypto";

// Generar un par de claves RSA (pública y privada)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

const publicKeyStripped = publicKey
  .replace('-----BEGIN RSA PUBLIC KEY-----\n', '')
  .replace('-----END RSA PUBLIC KEY-----\n', '')
  .replace(/\n/g, '');
const privateKeyStripped = privateKey
  .replace('-----BEGIN RSA PRIVATE KEY-----\n', '')
  .replace('-----END RSA PRIVATE KEY-----\n', '')
  .replace(/\n/g, '');



const privKey = Buffer.from(publicKeyStripped, 'base64').toString('hex');
const pubKey = Buffer.from(privateKeyStripped, 'base64').toString('hex');

/*
console.log(`Priv Key: ${privKey}

Pub Key: ${pubKey}

`);
*/

export { privKey as RSA_priv_key, pubKey as RSA_pub_key };
