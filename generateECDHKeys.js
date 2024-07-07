#!/usr/bin/env node

import crypto from "crypto"

const ecdh = crypto.createECDH("secp521r1");
ecdh.generateKeys();

const privateKey = ecdh.getPrivateKey('hex');
const publicKey = ecdh.getPublicKey("hex");

console.log(`Priv Key: ${privateKey}

Pub Key: ${publicKey}

`);

