"use strict";

/**
 * Converts string where each char coded with passed number of bytes, to array of bytes
 * @param str String that need to be converted
 * @param bytesPerChar Encoding setting. Number of bytes per character.
 * For UTF8 - 1, for UTF16 - 2 and so on.
 * @returns Array of bytes
 */
module.exports.stringToBytes = function(str, bytesPerChar = 1) {
	let bytes = [];
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		let stack = [];
		for (let j = 0; j < bytesPerChar; j++) {
			let byte = char & 255;
			stack.push(byte);
			char = char >> 8;
		}
		while(stack.length !== 0) {
			bytes.push(stack.pop());
		}
	}
	return bytes;
};

/**
 * Converts bytes to string with given encoding
 * @param bytes Array of bytes
 * @param bytesPerChar Encoding setting. Number of bytes per character.
 * For UTF8 - 1, for UTF16 - 2 and so on.
 * @returns string with passed encoding settings
 */
module.exports.bytesToString = function(bytes, bytesPerChar = 1) {
	let str = "";
	let iter = 0;
	let strLength = bytes.length / bytesPerChar;
	for (let i = 0; i < strLength; i++) {
		let charCode = 0;
		for (let j = 0; j < bytesPerChar; j++) {
			charCode = (charCode << 8) + bytes[iter];
			iter++;
		}
		str = str + String.fromCharCode(charCode);
	}
	return str;
};


/**
 * Detects number of bytes per char needed to code passed string.
 * Result can be used as param for bytesToString or stringToBytes
 * @param str String that need to scan
 * @returns int number of bytes that needs to code each character
 */
module.exports.detectBytesPerChar = function(str) {
	let maxBytes = 0;
	for (let i = 0; i < str.length; i++) {
		let code = str.charCodeAt(i);
		let charLength = 1;
		while (code > 255) {
			code = code >> 8;
			charLength++;
		}
		maxBytes = Math.max(maxBytes, charLength);
	}
	return maxBytes;
};