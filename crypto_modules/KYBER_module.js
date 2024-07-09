process.removeAllListeners('warning');

import PQClean from "pqclean";
import crypto from "crypto";

const { publicKey, privateKey } = await PQClean.kem.generateKeyPair('kyber1024');
const publicKeyHex = Buffer.from(publicKey.export()).toString('hex');
const privateKeyHex = Buffer.from(privateKey.export()).toString('hex');

const getPub = () => publicKeyHex;
const getPriv = () => privateKeyHex;


const KYBER_encrypt = async (plaintext, bob_pub_key) => {
  const publicKeyBuffer = Buffer.from(bob_pub_key, 'hex');
  const importedPublicKey = new PQClean.kem.PublicKey('kyber1024', publicKeyBuffer);

  const { key, encryptedKey } = await importedPublicKey.generateKey();

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');

  return {
    KYBER_ciphertext: encrypted,
    KYBER_iv: iv.toString('hex'),
    KYBER_tag: tag,
    KYBER_publicKey: Buffer.from(encryptedKey).toString('hex')
  };

};

const KYBER_decrypt = async (ciphertext, iv, tag, encryptedKeyHex, bob_priv_key) => {
  const ivBuffer = Buffer.from(iv, 'hex');
  const tagBuffer = Buffer.from(tag, 'hex');
  const encryptedKeyBuffer = Buffer.from(encryptedKeyHex, 'hex');

  const privateKeyBuffer = Buffer.from(bob_priv_key, 'hex');
  const importedPrivateKey = new PQClean.kem.PrivateKey('kyber1024', privateKeyBuffer);

  const sessionKeyBuffer = await importedPrivateKey.decryptKey(encryptedKeyBuffer);

  const decipher = crypto.createDecipheriv('aes-256-gcm', sessionKeyBuffer, ivBuffer);
  decipher.setAuthTag(tagBuffer);

  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};


export { getPriv as KYBER_priv_key, getPub as KYBER_pub_key, KYBER_encrypt, KYBER_decrypt };


