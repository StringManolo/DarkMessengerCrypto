#!/usr/bin/env node


import { ECIES_priv_key, ECIES_pub_key, ECIES_encrypt, ECIES_decrypt } from "./crypto_modules/ECIES_module.js";
import { RSA_priv_key     , RSA_pub_key, RSA_encrypt, RSA_decrypt } from "./crypto_modules/RSA_module.js";
/*
import { NTRU_priv_key    , NTRU_pub_key    } from "./generateNTRUKeys.js"
import { KYBER_priv_key   , KYBER_pub_key   } from "./generateKYBERKeys.js"
*/

const plaintext = "Hello, World!";

const debug = (algo, plaintext, encrypted, decrypted) => {
  console.log(`Data: [${plaintext}]
${algo}_encrypted: [${JSON.stringify(encrypted, null, 2)}]
${algo}_decrypted: [${decrypted}]
`);
};



/* [ START ECIES ] */
/* BOB generated it's keys a couple days ago using:
 * const bob_pub_key = ECIES_pub_key();
 * const bob_priv_key = ECIES_priv_key();
*/
// Bob keys
const bob_ECIES_pub_key = "0401c6ee9cd97ce8790cb1554551894c7ab8f51c8c64b2d90424f831ab02f4537843a0de9cef9ac8ff4de6a4fc6bb38f34a9369993dfe31b22720fe10250780daceedf00d12f021e52441f72d558c89ecf99bab8c955c6ac7cbbb38fc0bb01648acae45c9894c2ec645544ed802ef1e8d785a910f56ddd9e54a1cc9c012be283aa51b93cac";
const bob_ECIES_priv_key = "021f2ae7ba7f30a7a9726bfeeab9a45d8e8e60b9a4d98591c3adcd465bc160992d75e6f412186faf60f5bb7ea1d89cda0535356235177d62f101d853040b885fe5";

/* ALICE generated her publicKey today using:
 * const publicKey = ECIES_pub_key();
*/
const { ciphertext, iv, tag, publicKey } = ECIES_encrypt(plaintext, bob_ECIES_pub_key);
const decryptedText = ECIES_decrypt(ciphertext, iv, tag, publicKey, bob_ECIES_priv_key);

debug("ECIES", plaintext, { ciphertext, iv, tag, publicKey }, decryptedText);
/* [ END ECIES ] */


/* [ START RSA ] */
/* BOB generated it's keys a couple days ago using:
 * const bob_pub_key = RSA_pub_key();
 * const bob_priv_key = RSA_pub_key();
*/
// Bob keys
const bob_RSA_pub_key = "30820122300d06092a864886f70d01010105000382010f003082010a0282010100bae4a70f90ebff858e6549b1b4d088310fd97b3fa0d1a14f9a929e2a6bb02e4e8af1faa236ef2b43a066743025c6ef83f776b09dddcc5a13198563d26dab6ae10a78f53cd40d0bd9102e303e331b2cedd6941503bab7600c19594322ebd7d691debfd472d4f150701bd3c1eecb7af30a8117169178d9afdb77acd1d3cf9c38fd7e4c62dafd3ea39c822fbee7570eec6fc0e43ec6e067dd186fd6592ce772a30bde2e07a1a0c1d491ff4a03acf1347f7af021a91c00a79bddfaf2b1bc2476dd0fa288b824560a870e55b27e1f637a838288524be9c48a8c7cad6ef1fff87d8bf5c5c913747174939a06051fa15c449578ee95222ce0fdc88e679b949a8d21e2a50203010001";
const bob_RSA_priv_key = "308204a40201000282010100bae4a70f90ebff858e6549b1b4d088310fd97b3fa0d1a14f9a929e2a6bb02e4e8af1faa236ef2b43a066743025c6ef83f776b09dddcc5a13198563d26dab6ae10a78f53cd40d0bd9102e303e331b2cedd6941503bab7600c19594322ebd7d691debfd472d4f150701bd3c1eecb7af30a8117169178d9afdb77acd1d3cf9c38fd7e4c62dafd3ea39c822fbee7570eec6fc0e43ec6e067dd186fd6592ce772a30bde2e07a1a0c1d491ff4a03acf1347f7af021a91c00a79bddfaf2b1bc2476dd0fa288b824560a870e55b27e1f637a838288524be9c48a8c7cad6ef1fff87d8bf5c5c913747174939a06051fa15c449578ee95222ce0fdc88e679b949a8d21e2a502030100010282010002ee2d616784ba71af667955eae4c9d1e272a6f05136f592cadf697bf6f5765069ca2558d048313de2f60af480a477cd1cfef48226801059d42607873d36cec59f0aaa510d191eefafc582f64d5fabcac1e3cf58358aafb1438a27023fea41e01bd041b0ed93a80ecdf23a21a2a3f7a0c3f3e6f91a7392ad3c03e4195b06bdccfd85f0f15ad99fccd2c5eb43c82375993c712b304423fce9b7f6132664fd9ddec23ec165b678509a721bd07502e66f3ab31628729bc3a89893a7a4f019bf30d8a2d35cb38b3c13b34b8feb6d9fd9546192b45197ae796f788c530f23d6b99a3c432629119e972b353763d5b7bf3f7ea358863c918b958c632591e047f584133902818100e341a3216dc3e52686e929f81170e46a927adf440d46f6a3ab8d86d88f6025e65260d2ca5548d2d26e0f90b65ba567ee0ce260732aaf48fee8cdc9a31285733a091a18a77bf29261cfd5c3f0014441922b0ab275062434ac8c2239271253b05a24c30029e41c74b56d730b1ba1d388e8ea658a66ee10993009d199ab3ed2818902818100d28816f323d1dc24154a6f0f04b36b055105cb06ad47e01d3ac13f54a97389c788a4758f59bfc8525584a1a299eea4563008f1d03fc320ccdd10f959f156a3dcb2bd672ff86513be353739ba4eb00621811e6b58b33e2f4ad07e3ec223319c877527a744139d631432550ef578874a97fd5079b42e673e844e8b81c665489d3d02818100d4d770b5aa5c428e26e4d1cde867d74689125371250e45895cef1c504f5839a6d198a553a334a55f387d938777a61f04b1448418d8ed7a6c6415f8b7a66d1e52489c0c63308f2bd23819797d9b72160794105cbb8598fb4c6fa2cdec6e19bb9d71b8c0ba7b4ebb7000a632cd1a6f4856fcd14522c9ecf9cc28260aca7bf8242102818100aca772babf5b71c01dbdc74a77be743c0df0444a1b7d606c582cf735052a7d89a7a3c7cd61fb07db8dca918bf9d55dec58c45d1b3dcf566cebb6e9e73b26a487700628438cdfc7cb2b7538e0737ba3eb822a623a81f4b37015801313bf2d0683882e96dc1b81ed293905cc98bed9a4f0f48b34e3f1523650e6e13df268499eb9028180583efe7ebaab57806dffde24feb18afb03f30fb5f716a6cf39d0a0d14935e8482115701a075d33a44157c8fc32399656cd291bcdfeb78357b803285be9bf7b1f9e97817f50dd5a83f62dbc5ab55e34f31d231422d3a182bf497014aec4cbfc1606499d8de578b9dd9d56f2bf11339428a0910ebe697345b72db7e759458174da";


/* ALICE do not need to generate a key for RSA */
const encrypted_RSA = RSA_encrypt(plaintext, bob_RSA_pub_key);
const decrypted_RSA = RSA_decrypt(encrypted_RSA, bob_RSA_priv_key);
debug("RSA", plaintext, encrypted_RSA, decrypted_RSA);


