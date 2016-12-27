"use strict";

import * as utils from "./src/utils";
import * as aes from "./src/aes";

module.exports = {
	generateKey: aes.generateKey,
	encrypt: aes.encrypt,
	decrypt: aes.decrypt,
	utils
};