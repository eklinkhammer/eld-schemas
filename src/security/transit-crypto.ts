// RSA-OAEP(SHA-256) helpers for transit encryption/decryption (Node)
import { publicEncrypt, privateDecrypt, constants } from "node:crypto";

export function encryptRsaOaepSha256ToB64(plaintext: string, publicKeyPem: string): string {
  const ciphertext = publicEncrypt(
    {
      key: publicKeyPem,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(plaintext, "utf8")
  );
  return ciphertext.toString("base64");
}

export function decryptRsaOaepSha256B64(ciphertextB64: string, privateKeyPem: string, passphrase?: string): string {
  const plaintext = privateDecrypt(
    {
      key: privateKeyPem,
      passphrase,
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(ciphertextB64, "base64")
  );
  return plaintext.toString("utf8");
}
