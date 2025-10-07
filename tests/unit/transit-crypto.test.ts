import { describe, it, expect } from "vitest";
import { generateKeyPairSync } from "node:crypto";
import {
  encryptRsaOaepSha256ToB64,
  decryptRsaOaepSha256B64,
} from "../../src/security/transit-crypto";

describe("RSA-OAEP(SHA-256) transit crypto", () => {
  // Generate a fresh RSA keypair for tests (PKCS#8 private, SPKI public)
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const PLAINTEXT = "p@ssw0rd! 🔐";

  it("Node → Node roundtrip works", () => {
    const ct = encryptRsaOaepSha256ToB64(PLAINTEXT, publicKey);
    const pt = decryptRsaOaepSha256B64(ct, privateKey);
    expect(pt).toBe(PLAINTEXT);
  });

  it("fails to decrypt with the wrong private key", () => {
    const ct = encryptRsaOaepSha256ToB64(PLAINTEXT, publicKey);

    // wrong keypair
    const { privateKey: wrongPriv } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    expect(() => decryptRsaOaepSha256B64(ct, wrongPriv)).toThrow();
  });
});
