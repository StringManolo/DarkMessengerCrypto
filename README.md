### DarkMessenger: Secure End-to-End Encryption and Message Authentication

This documentation provides an overview of the cryptographic modules used in DarkMessenger. Each module implements a different encryption method, ensuring a robust and multi-layered approach to security.


### ERK Module (`crypto_modules/ERK_module.js`)

Combines functionalities from ECIES, RSA, and KYBER modules into a unified cryptography module.

**Purpose:**
- Provides a comprehensive encryption framework leveraging multiple cryptographic algorithms.
- Facilitates secure key generation, encryption, and decryption using ECIES, RSA, and KYBER methods.

**Functionality:**
- **ECIES Integration:**
  - Exports: ECIES_priv_key, ECIES_pub_key, ECIES_encrypt, ECIES_decrypt
  - Implements: Elliptic Curve Integrated Encryption Scheme (ECIES) using the P-521 curve.

- **RSA Integration:**
  - Exports: RSA_priv_key, RSA_pub_key, RSA_encrypt, RSA_decrypt
  - Implements: RSA encryption with 2048-bit keys and hex codification for PEM.

- **KYBER Integration:**
  - Exports: KYBER_priv_key, KYBER_pub_key, KYBER_encrypt, KYBER_decrypt
  - Implements: Post-quantum encryption using the Kyber1024 KEM algorithm.

**Usage:**
```javascript
const ERK = require("ERK");

// Example usage with ECIES
const encryptedData = ERK.ECIES_encrypt(data, ERK.ECIES_pub_key);
const decryptedData = ERK.ECIES_decrypt(encryptedData, ERK.ECIES_priv_key);

// Example usage with RSA
const encryptedMessage = ERK.RSA_encrypt(message, ERK.RSA_pub_key);
const decryptedMessage = ERK.RSA_decrypt(encryptedMessage, ERK.RSA_priv_key);

// Example usage with KYBER
const encryptedText = ERK.KYBER_encrypt(text, ERK.KYBER_pub_key);
const decryptedText = ERK.KYBER_decrypt(encryptedText, ERK.KYBER_priv_key);
```

---

#### ECIES Module (`crypto_modules/ECIES_module.js`)

Implements Elliptic Curve Integrated Encryption Scheme (ECIES) with the P-521 curve.

**Purpose:**
1. Generates an ECIES key pair for Bob.
2. Allows Alice to encrypt data using Bob's public key without pre-sharing Alice public key.
3. Allows Bob to decrypt the encrypted data using his private key.

---

#### RSA Module (`crypto_modules/RSA_module.js`)

Implements RSA encryption with 2048-bit keys and uses hex codification for PEM.

**Purpose:**
1. Generates RSA key pairs.
2. Allows encryption using RSA public key.
3. Allows decryption using RSA private key.

---

#### KYBER Module (`crypto_modules/KYBER_module.js`)

Implements post-quantum encryption using the Kyber1024 KEM algorithm.

**Purpose:**
1. Generates Kyber key pair for Bob.
2. Allows Alice to encrypt data using Bob's public key without pre-sharing Alice public key.
3. Allows Bob to decrypt the encrypted data using his private key.



