# zaes-js
[![ES 6](https://camo.githubusercontent.com/567e52200713e0f0c05a5238d91e1d096292b338/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f65732d362b2d627269676874677265656e2e737667)](https://camo.githubusercontent.com/567e52200713e0f0c05a5238d91e1d096292b338/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f65732d362b2d627269676874677265656e2e737667)
[![npm version](https://badge.fury.io/js/zaes-js.svg)](https://badge.fury.io/js/zaes-js)
[![Build Status](https://travis-ci.org/alikhil/zaes-js.svg?branch=master)](https://travis-ci.org/alikhil/zaes-js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ede7195711274ea48772aeb198572c44)](https://www.codacy.com/app/alikhil/zaes-js?utm_source=github.com&utm_medium=referral&utm_content=alikhil/zaes-js&utm_campaign=badger)
[![Code Climate](https://codeclimate.com/github/alikhil/zaes-js/badges/gpa.svg)](https://codeclimate.com/github/alikhil/zaes-js)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ede7195711274ea48772aeb198572c44)](https://www.codacy.com/app/alikhil/zaes-js?utm_source=github.com&utm_medium=referral&utm_content=alikhil/zaes-js&utm_campaign=Badge_Coverage)

AES encryption implementation.

## Attention!
Before you will learn this lib, I **highly recommend** you to go through other aes implementations in js, because I imlemented zaes.js only because other libraries did not meet my requirements. Some of them you can find [here](https://gist.github.com/jo/8619441).

## Installation

```sh
npm install zaes-js
```

## Usage

Usage of `zaes-js` on browser is similar to usage in nodejs. The only difference is initialization.

### Initialization

#### Node js 6+
```js
var aes = require("zaes-js");
```

#### Browser

There is `bundle.zaes.js` in `./node_modules/zaes-js/` directory.

Include it on your html:
```html
<script src="/path/to/bundle.zaes.js"></script>
```
After loading script there will be `aes` global varialbe available. 

### Generating key

To encrypt string with AES, you always need a key. You can use own key or generate it using `aes.generateKey` function that returns secure random key. 

**Note!** 

If you using your own key be sure that is valid. Valid means that it is array of bytes(0-255) with length **16, 24 or 32**(for **128, 192 and 256** bit keys respectively).

```js
var keyLength = 16; // Or it can be 24 or 32
var key = aes.generateKey(keyLength);

key -> [90, 50, 232, 234, 132, 249, 197, 211, 125, 63, 231, 52, 35, 126, 190, 42]
```

### Encrypting

Use `aes.encrypt(bytes, key)` function to encrypt array of bytes.

Where `bytes` is array of bytes with any length and `key` is AES key to encrypt with.

```js
var bytes = [122, 97, 101, 115, 32, 106, 115];
var encrypted = aes.encrypt(bytes, key);

encrypted -> [32, 223, 97, 187, 151, 149, 181, 126, 92, 222, 193, 174, 219, 39, 60, 231]
```

### Decrypting

Use `aes.decrypt(bytes, key)` to decrypt data that was encrypted with passed key.

```js
var decrypted = aes.decrypt(encrypted, key);

decrypted -> [122, 97, 101, 115, 32, 106, 115]
```

### Utils

You read above how to encrypt/decrypt bytes. But what if you will want string to be encrypted. 

For this case zaes-js includes `utils` module, that allows to convert **strings to bytes** and **bytes to strings**. 

See examples below for **single byte characters** in string(UTF8, ASCII).

```js
var message = "my top secret message";
var bytes = aes.utils.stringToBytes(message);

var key = aes.generateKey(32); // top secret key

var cipher = aes.encrypt(bytes);

var initialMessage = aes.utils.bytesToString(aes.decrypt(bytes, key));
```

If your string contains character which coded with 2 or more bytes you need to specify it in param for `stringToBytes` and `bytesToString` functions.

```js
var bytesPerChar = 2;
var message = "鸠尠㜂᠆삮";  // chinese characters codes with 2 bytes
var bytes = aes.utils.stringToBytes(message, bytesPerChar);

var initMessage = aes.utils.bytesToString(bytes, bytesPerChar);
```

If you don't sure about `bytesPerChar` param you can use `detectBytesPerChar` function.

```js
var message = "strange message, with 鸠尠㜂᠆삮 characters";
var bytesPerChar = aes.utils.detectBytesPerChar(message); // it will return 2, because of chinese chars

// then use bytesPerChar in stringToBytes or bytesToString

```
