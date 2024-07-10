import forge from 'node-forge';

const convertPemToHex = (pemKey, isPrivate = false) => {
    let key;
    if (isPrivate) {
        key = forge.pki.privateKeyFromPem(pemKey);
        const asn1 = forge.pki.privateKeyToAsn1(key);
        return forge.util.bytesToHex(forge.asn1.toDer(asn1).getBytes());
    } else {
        key = forge.pki.publicKeyFromPem(pemKey);
        const asn1 = forge.pki.publicKeyToAsn1(key);
        return forge.util.bytesToHex(forge.asn1.toDer(asn1).getBytes());
    }
};

const convertHexToPem = (hexKey, isPrivate) => {
    const der = forge.util.hexToBytes(hexKey);
    const asn1 = forge.asn1.fromDer(der);
    return isPrivate ? forge.pki.privateKeyToPem(forge.pki.privateKeyFromAsn1(asn1)) : forge.pki.publicKeyToPem(forge.pki.publicKeyFromAsn1(asn1));
};

const generateKeys = () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const publicKeyHex = convertPemToHex(forge.pki.publicKeyToPem(keyPair.publicKey));
    const privateKeyHex = convertPemToHex(forge.pki.privateKeyToPem(keyPair.privateKey), true);
    return { publicKeyHex, privateKeyHex };
};

const { publicKeyHex: RSA_pub_key, privateKeyHex: RSA_priv_key } = generateKeys();

const RSA_encrypt = (plaintext, bob_pub_key_hex) => {
    const bob_pub_key_pem = convertHexToPem(bob_pub_key_hex, false);
    const publicKey = forge.pki.publicKeyFromPem(bob_pub_key_pem);
    const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
    return forge.util.encode64(encrypted);
};

const RSA_decrypt = (ciphertext, bob_priv_key_hex) => {
    const bob_priv_key_pem = convertHexToPem(bob_priv_key_hex, true);
    const privateKey = forge.pki.privateKeyFromPem(bob_priv_key_pem);
    const decoded = forge.util.decode64(ciphertext);
    const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
    return decrypted;
};

export { RSA_pub_key, RSA_priv_key, RSA_encrypt, RSA_decrypt };

