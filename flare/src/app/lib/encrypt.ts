import forge from "node-forge";

import { createHash } from "crypto";
const rsa = forge.pki.rsa;
export const generateKeys = () => {
  const keypair = rsa.generateKeyPair({ bits: 2048 });
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
  return { publicKey, privateKey };
};

export const encryptData = (data: string, key: string) => {
  const publicKeyObj = forge.pki.publicKeyFromPem(key);
  const encrypted = publicKeyObj.encrypt(
    forge.util.encodeUtf8(data),
    "RSA-OAEP"
  );
  console.log(`b'${encrypted}'`);
  return forge.util.encode64(encrypted);
};

export const decryptData = (data: string, privKey: string) => {
  const privKeyObj = forge.pki.privateKeyFromPem(privKey);
  const decoded = forge.util.decode64(data);
  const decrypted = privKeyObj.decrypt(decoded, "RSA-OAEP");
  return forge.util.decodeUtf8(decrypted);
};

export const hashFunc = (encrypted: string) => {
  return createHash("sha256").update(encrypted).digest("hex");
};

function splitmix32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x9e3779b9) | 0;
    let t = seed ^ (seed >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

export const pyHash = (data: string) => {
  let x = data.charCodeAt(0) << 7;
  for (let i = 1; i < data.length; i++) {
    x = ((1000003 * x) ^ data.charCodeAt(i)) & ((1 << 32) - 1);
  }

  const rand = splitmix32(x);
  return rand();
};
