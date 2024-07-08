#!/usr/bin/env node

import PQClean from "pqclean"

(async() => {
  try {
    const { publicKey, privateKey } = await PQClean.kem.generateKeyPair('kyber1024');

    const publicKeyHex = Buffer.from(publicKey.export()).toString('hex');
    const privateKeyHex = Buffer.from(privateKey.export()).toString('hex');

    console.log(`Priv Key: ${privateKeyHex}

Pub Key: ${publicKeyHex}

`);
  } catch (error) {
    console.error('Error generating keys:', error);
  }
})();


