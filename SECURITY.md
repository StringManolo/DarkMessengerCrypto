- Normalize crypto_modules/ECIES_module.js encryption output to don't include predictable javascript object.  
- Add live tests with different implementations of the same algo to detect attacks/bugs in the libraries. (Prevent Key Generation and send message to devs email -if configured to do so- to test the bug/attack)
- Distribute each public key using a different circuit and exit tor node.  