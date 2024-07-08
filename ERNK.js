#!/usr/bin/env node


import { ECIES_priv_key, ECIES_pub_key, ECIES_encrypt, ECIES_decrypt } from "./crypto_modules/ECIES_module.js"
/*
import { RSA_priv_key     , RSA_pub_key     } from "./generateRSAKeys.js"
import { NTRU_priv_key    , NTRU_pub_key    } from "./generateNTRUKeys.js"
import { KYBER_priv_key   , KYBER_pub_key   } from "./generateKYBERKeys.js"
*/


const debug = (algo, plaintext, encrypted, decrypted) => {
  console.log(`Data: [${plaintext}]
${algo}_encrypted: [${JSON.stringify(encrypted, null, 2)}]
${algo}_decrypted: [${decrypted}]
`);
};


/* BOB generated it's keys a couple days ago using:
 * const bob_pub_key = ECIES_pub_key();
 * const bob_priv_key = ECIES_priv_key();
*/
// Bob keys
const bob_pub_key = "0401c6ee9cd97ce8790cb1554551894c7ab8f51c8c64b2d90424f831ab02f4537843a0de9cef9ac8ff4de6a4fc6bb38f34a9369993dfe31b22720fe10250780daceedf00d12f021e52441f72d558c89ecf99bab8c955c6ac7cbbb38fc0bb01648acae45c9894c2ec645544ed802ef1e8d785a910f56ddd9e54a1cc9c012be283aa51b93cac";
const bob_priv_key = "021f2ae7ba7f30a7a9726bfeeab9a45d8e8e60b9a4d98591c3adcd465bc160992d75e6f412186faf60f5bb7ea1d89cda0535356235177d62f101d853040b885fe5";


/* ALICE generated her publicKey today using:
 * const publicKey = ECIES_pub_key();
*/
const plaintext = "Hello, World!";

const { ciphertext, iv, tag, publicKey } = ECIES_encrypt(plaintext, bob_pub_key);
const decryptedText = ECIES_decrypt(ciphertext, iv, tag, publicKey, bob_priv_key);

debug("ECIES", plaintext, { ciphertext, iv, tag, publicKey }, decryptedText);

