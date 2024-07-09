# DarkMessengerCrypto

Cryptography for DarkMessenger: Secure end-to-end encryption and message authentication.

### Files:

#### ERNK.js
Utilizes all encryption methods simultaneously.

#### crypto_modules/ECIES_module.js
Implements ECIES with p521 curve. This module serves three main purposes:
1. Generates key pair for BOB.
2. Allows Alice to encrypt data using Bob's public key without pre-sharing her public key.
3. Allows BOB to decrypt the encrypted data using his private key.

This scheme is made possible without dual channel pre-sharing because Alice uses an ephemeral public key included in the encrypted data.

Details included in the encrypted data:
- Ciphertext (the encrypted data itself)
- IV (Initialization Vector)
- Tag (Authentication Tag)
- PublicKey (Alice's public key used for encryption)

#### crypto_modules/RSA_module.js
Implements RSA 2048 bits. Uses hex codification for PEM.
