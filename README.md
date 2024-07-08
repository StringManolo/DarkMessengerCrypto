# DarkMessengerCrypto
Cryptography for DarkMessenger: Secure end-to-end encryption and message authentication.


### Files:

##### ERNK.js
Use all encryption at same time.

##### crypto_modules/ECIES_module.js
Use ECIES with p521 curve. This module has 3 different usages:
1. Generate key par for BOB
2. Allow Alice to encrypt data with Bob's public key without presharing her public key.
3. Allow BOB to decrypt the encrypted data with his private key.  
  
This scheme is possible without dual channel presharing cuz Alice uses an ephimeral public key that includes in the encrypted data.   
  
The encrypted data has next details:
- Ciphertext (the data itself after encryption)

