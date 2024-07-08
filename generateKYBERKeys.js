#!/usr/bin/env node

process.removeAllListeners('warning');

import PQClean from "pqclean"

const { publicKey, privateKey } = await PQClean.kem.generateKeyPair('kyber1024');

const publicKeyHex = Buffer.from(publicKey.export()).toString('hex');
const privateKeyHex = Buffer.from(privateKey.export()).toString('hex');

/*
    console.log(`Priv Key: ${privateKeyHex}

Pub Key: ${publicKeyHex}

`);
*/

export { privateKeyHex as KYBER_priv_key, publicKeyHex as KYBER_pub_key };
