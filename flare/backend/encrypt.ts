import forge from "node-forge";
import { createHash }from "crypto";
let rsa = forge.pki.rsa
export const generateKeys = () => {
    const keypair = rsa.generateKeyPair({bits: 2048});
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    return { publicKey, privateKey };
}

export const encryptData = (data: string, key:string) => {
    const publicKeyObj = forge.pki.publicKeyFromPem(key);
    const encrypted = publicKeyObj.encrypt(forge.util.encodeUtf8(data), 'RSA-OAEP');
    return forge.util.encode64(encrypted);
};

export const decryptData = (data: string, privKey: string) => {
    const privKeyObj = forge.pki.privateKeyFromPem(privKey);
    const decoded = forge.util.decode64(data);
    const decrypted = privKeyObj.decrypt(decoded, 'RSA-OAEP');
    return forge.util.decodeUtf8(decrypted);
};

// Usage
const { publicKey, privateKey } = generateKeys();
const message = "Hello, RSA Encryption!";
const encrypted = encryptData(message, publicKey);
const decrypted = decryptData(encrypted, privateKey);

console.log("Original Message:", message);
console.log("Encrypted Message:", encrypted);
console.log("Decrypted Message:", decrypted);

const hashFunc = (encrypted: string) => {
    return createHash('sha256').update(encrypted).digest('hex')
}

