"use strict";

/**
 * Simply converts string to bytes with String.charCodeAt function
 */
function utf8ToBytes(str) {
	let bytes = new Array(str.length);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return bytes;
}

/**
 * Simply converts bytes to utf8 string using String.fromCharCode function
 */
function bytesToUTF8(bytes) {
	let str = "";
	for (let i = 0; i < bytes.length; i++) {
		str += String.fromCharCode(bytes[i]);
	}
	return str;
}

/**
 * Converts string where each char coded with passed number of bytes, to array of bytes
 * @param str String that need to be converted
 * @param bytesPerChar Encoding setting. Number of bytes per character.
 * For UTF8 - 1, for UTF16 - 2 and so on.
 * @returns Array of bytes
 */
export function stringToBytes(str, bytesPerChar = 1) {
	switch(bytesPerChar) {
	case 1:
		return utf8ToBytes(str);
	default:
		throw new Error(`Converting string from ${bytesPerChar} to bytes not implemented yet`);
	}
} 

/**
 * Converts bytes to string with given encoding
 * @param bytes Array of bytes
 * @param bytesPerChar Encoding setting. Number of bytes per character.
 * For UTF8 - 1, for UTF16 - 2 and so on.
 * @returns string with passed encoding settings
 */
export function bytesToString(bytes, bytesPerChar = 1) {
	switch(bytesPerChar) {
	case 1:
		return bytesToUTF8(bytes);
	default:
		throw new Error(`Converting from bytes to string where char is ${bytesPerChar} bytes, not implemented yet`);
	}
}
