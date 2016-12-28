"use strict";

const utils = require("./src/utils");
const aes = require("./src/aes");

module.exports = {
	generateKey: aes.generateKey,
	encrypt: aes.encrypt,
	decrypt: aes.decrypt,
	utils
};