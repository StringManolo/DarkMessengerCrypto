import crypto from 'crypto';
import pkg from 'elliptic';

const { ec: EC } = pkg;
const ec = new EC('p521');

const generateKeys = () => {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');
    return { publicKey, privateKey };
};

const { publicKey: alice_pub_key, privateKey: alice_priv_key } = generateKeys();

const ECIES_pub_key = () => {
    return alice_pub_key;
};

const ECIES_priv_key = () => {
    return alice_priv_key;
};

const deriveSharedKey = (publicKey, privateKey) => {
    const pubKey = ec.keyFromPublic(publicKey, 'hex');
    const privKey = ec.keyFromPrivate(privateKey, 'hex');
    const sharedKey = privKey.derive(pubKey.getPublic());
    const sharedKeyBuffer = Buffer.from(sharedKey.toArray());
    return crypto.createHash('sha256').update(sharedKeyBuffer).digest();
};

const ECIES_encrypt = (plaintext, bob_pub_key) => {
    const sharedKey = deriveSharedKey(bob_pub_key, alice_priv_key); 
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', sharedKey, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return {
        ciphertext: encrypted.toString('hex'),
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        publicKey: alice_pub_key 
    };
};

const ECIES_decrypt = (ciphertext, iv, tag, alice_pub_key, bob_priv_key) => {
    const sharedKey = deriveSharedKey(alice_pub_key, bob_priv_key); 
    const decipher = crypto.createDecipheriv('aes-256-gcm', sharedKey, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(ciphertext, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
};

export { ECIES_pub_key, ECIES_priv_key, ECIES_encrypt, ECIES_decrypt };

