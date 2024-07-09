### DarkMessenger: Secure End-to-End Encryption and Message Authentication

This documentation provides an overview of the cryptographic modules used in DarkMessenger. Each module implements a different encryption method, ensuring a robust and multi-layered approach to security.

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


---

#### ERN Module (`ERN.js`)

Combines all the modules 

**Purpose:**
- Provides strong encryption using both classical and post-quantum cryptography.
- Enables secure one-way communications.
- Facilitates key distribution through multiple channels, requiring an attacker to capture all three different public keys.
- Uses unique keys for each session to prevent key reuse.

By combining these cryptographic methods, DarkMessenger ensures robust security for its communications, leveraging both classical and post-quantum cryptography.

