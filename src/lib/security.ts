import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    return false;
  }

  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  if (hashedBuffer.length !== keyBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashedBuffer, keyBuffer);
}

export function createToken(length = 32) {
  return randomBytes(length).toString("hex");
}
