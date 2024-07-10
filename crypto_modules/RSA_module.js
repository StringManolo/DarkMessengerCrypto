import forge from 'node-forge';
import crypto from 'crypto';

const pemToHex = (pem) => Buffer.from(pem, 'utf8').toString('hex');
const hexToPem = (hex) => Buffer.from(hex, 'hex').toString('utf8');

const generateKeys = () => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);
  return {
    publicKey: pemToHex(publicKey),
    privateKey: pemToHex(privateKey)
  };
};

const { publicKey: alice_pub_key, privateKey: alice_priv_key } = generateKeys();
const RSA_pub_key = () => alice_pub_key;
const RSA_priv_key = () => alice_priv_key;

const AES_encrypt = (plaintext, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: encrypted.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
};

const AES_decrypt = (ciphertext, key, iv, tag) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(ciphertext, 'hex')), decipher.final()]);
  return decrypted.toString('utf8');
};

const RSA_encrypt = (plaintext, bob_pub_key_hex) => {
  const aesKey = crypto.randomBytes(32);
  const aesEncrypted = AES_encrypt(plaintext, aesKey);
  const bob_pub_key_pem = hexToPem(bob_pub_key_hex);
  const publicKey = forge.pki.publicKeyFromPem(bob_pub_key_pem);
  const encryptedAesKey = forge.util.encode64(publicKey.encrypt(aesKey.toString('binary'), 'RSA-OAEP', {
    md: forge.md.sha256.create()
  }));
 
  return {
    RSA_ciphertext: aesEncrypted.ciphertext,
    RSA_iv: aesEncrypted.iv,
    RSA_tag: aesEncrypted.tag,
    RSA_publicKey: encryptedAesKey
  };
};

const RSA_decrypt = (ciphertext, iv, tag, encryptedAesKey, bob_priv_key_hex) => {
  try {
    const bob_priv_key_pem = hexToPem(bob_priv_key_hex);
    const privateKey = forge.pki.privateKeyFromPem(bob_priv_key_pem);
    const encryptedAesKeyBase64 = forge.util.decode64(encryptedAesKey);
    
    const decryptedAesKey = privateKey.decrypt(encryptedAesKeyBase64, 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
    
    const aesKey = Buffer.from(decryptedAesKey, 'binary');
    const decryptedText = AES_decrypt(ciphertext, aesKey, iv, tag);
    
    return decryptedText;
  } catch (error) {
    throw error; 
  }
};

export { RSA_pub_key, RSA_priv_key, RSA_encrypt, RSA_decrypt };

