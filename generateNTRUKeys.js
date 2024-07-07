#!/usr/bin/env node

import ntru  from 'ntru';

const keyPair = await ntru.keyPair();
const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

console.log(`Priv Key: ${Buffer.from(privateKey).toString("hex")}

Pub Key: ${Buffer.from(publicKey).toString("hex")}
`);

