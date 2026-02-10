<h1 align="center">
  <sup>@se-oss/apr1</sup>
  <br>
  <a href="https://github.com/shahradelahi/ts-apr1/actions/workflows/ci.yml"><img src="https://github.com/shahradelahi/ts-apr1/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@se-oss/apr1"><img src="https://img.shields.io/npm/v/@se-oss/apr1.svg" alt="NPM Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License"></a>
  <a href="https://bundlephobia.com/package/@se-oss/apr1"><img src="https://img.shields.io/bundlephobia/minzip/@se-oss/apr1" alt="npm bundle size"></a>
  <a href="https://packagephobia.com/result?p=@se-oss/apr1"><img src="https://packagephobia.com/badge?p=@se-oss/apr1" alt="Install Size"></a>
</h1>

_@se-oss/apr1_ provides Apache's APR1 MD5 password hashing for Node.js and browsers, offering a lightweight and isomorphic solution for htpasswd-compatible authentication.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/apr1
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm install @se-oss/apr1
```

**yarn**

```bash
yarn add @se-oss/apr1
```

</details>

## 📖 Usage

### Generate Hash

Generate a secure APR1 hash for a password. If no salt is provided, a random 8-character salt is automatically generated.

```ts
import { generateApr1 } from '@se-oss/apr1';

// With automatic salt generation
const hash = generateApr1('my-password');
// $apr1$8x9z2p4n$L3...

// With specific salt
const saltedHash = generateApr1('my-password', 'Hl8aeGwd');
// $apr1$Hl8aeGwd$eu0KXh0r52OnPC/yzIzWF1
```

### Verify Hash

Verify if a plain-text password matches an existing APR1 hash using timing-safe comparison.

```ts
import { verifyApr1 } from '@se-oss/apr1';

const isValid = verifyApr1(
  'my-password',
  '$apr1$Hl8aeGwd$eu0KXh0r52OnPC/yzIzWF1'
);
console.log(isValid); // true
```

### Isomorphic Support

This library works seamlessly in both Node.js and modern browsers using `TextEncoder` and standard Uint8Array operations.

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/apr1).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-apr1).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-apr1/graphs/contributors).
