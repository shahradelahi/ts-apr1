import { describe, expect, it } from 'vitest';

import { generateApr1, verifyApr1 } from './index';

describe('apr1', () => {
  it('should generate valid APR1 hash', () => {
    const password = 'password';
    const salt = 'Hl8aeGwd';
    const hash = generateApr1(password, salt);
    expect(hash).toBe('$apr1$Hl8aeGwd$eu0KXh0r52OnPC/yzIzWF1');
  });

  it('should verify valid APR1 hash', () => {
    const hash = '$apr1$Hl8aeGwd$eu0KXh0r52OnPC/yzIzWF1';
    expect(verifyApr1('password', hash)).toBe(true);
  });

  it('should not verify invalid APR1 hash', () => {
    const hash = '$apr1$Hl8aeGwd$eu0KXh0r52OnPC/yzIzWF1';
    expect(verifyApr1('wrong', hash)).toBe(false);
  });

  it('should generate hash with random salt if not provided', () => {
    const hash = generateApr1('password');
    expect(hash).toMatch(/^\$apr1\$[a-z0-9]{8}\$.+/);
  });
});
