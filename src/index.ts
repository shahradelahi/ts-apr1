import { md5 } from '@se-oss/md5';
import { safeCompare } from '@se-oss/timing-safe-compare';

import { concat } from './utils';

/**
 * Apache's APR1 MD5 implementation.
 * Adapted from various open-source implementations.
 */

const itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function encode64(v: number, n: number): string {
  let res = '';
  while (--n >= 0) {
    res += itoa64.charAt(v & 0x3f);
    v >>= 6;
  }
  return res;
}

/**
 * Generates an APR1 MD5 hash for a given password and salt.
 *
 * @param password The password to hash.
 * @param salt The salt to use. If not provided, a random one will be generated.
 * @returns The generated APR1 hash.
 */
export function generateApr1(password: string, salt?: string): string {
  const encoder = new TextEncoder();
  const pwBytes = encoder.encode(password);

  let saltStr: string;
  if (!salt) {
    saltStr = Math.random().toString(36).slice(2, 10);
  } else if (salt.startsWith('$apr1$')) {
    const parts = salt.split('$');
    saltStr = parts[2] ?? '';
  } else {
    saltStr = salt;
  }
  saltStr = saltStr.slice(0, 8);
  const saltBytes = encoder.encode(saltStr);
  const magicBytes = encoder.encode('$apr1$');

  // Initial Digest
  let contextData = concat([pwBytes, magicBytes, saltBytes]);

  const finalState = md5(concat([pwBytes, saltBytes, pwBytes]));

  for (let pl = password.length; pl > 0; pl -= 16) {
    const len = pl > 16 ? 16 : pl;
    contextData = concat([contextData, finalState.slice(0, len)]);
  }

  const zero = new Uint8Array([0]);
  const firstChar = pwBytes.slice(0, 1);

  for (let i = password.length; i > 0; i >>= 1) {
    if (i & 1) {
      contextData = concat([contextData, zero]);
    } else {
      contextData = concat([contextData, firstChar]);
    }
  }

  let final = md5(contextData);

  for (let i = 0; i < 1000; i++) {
    const parts: Uint8Array[] = [];

    if (i & 1) {
      parts.push(pwBytes);
    } else {
      parts.push(final);
    }

    if (i % 3) {
      parts.push(saltBytes);
    }

    if (i % 7) {
      parts.push(pwBytes);
    }

    if (i & 1) {
      parts.push(final);
    } else {
      parts.push(pwBytes);
    }

    final = md5(concat(parts));
  }

  let res = '$apr1$' + saltStr + '$';
  res += encode64(((final[0] ?? 0) << 16) | ((final[6] ?? 0) << 8) | (final[12] ?? 0), 4);
  res += encode64(((final[1] ?? 0) << 16) | ((final[7] ?? 0) << 8) | (final[13] ?? 0), 4);
  res += encode64(((final[2] ?? 0) << 16) | ((final[8] ?? 0) << 8) | (final[14] ?? 0), 4);
  res += encode64(((final[3] ?? 0) << 16) | ((final[9] ?? 0) << 8) | (final[15] ?? 0), 4);
  res += encode64(((final[4] ?? 0) << 16) | ((final[10] ?? 0) << 8) | (final[5] ?? 0), 4);
  res += encode64(final[11] ?? 0, 2);

  return res;
}

/**
 * Verifies an APR1 MD5 hash against a password.
 *
 * @param password The password to verify.
 * @param hash The APR1 hash to verify against.
 * @returns True if the password matches the hash.
 */
export function verifyApr1(password: string, hash: string): boolean {
  return safeCompare(generateApr1(password, hash), hash);
}
