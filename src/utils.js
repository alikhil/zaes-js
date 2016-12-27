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
 * Converts string with given encoding("utf8" default) to string of bytes
 * @param str String that need to be converted
 * @param encoding encoding of given string. default is "utf8"
 * @returns Array of bytes
 */
function stringToBytes(str, encoding="utf8") {
    switch(encoding.toLowerCase()) {
        case "utf8":
            return utf8ToBytes(str);
        default:
            throw new Error(`Converting string from ${encoding} to bytes not implemented yet`);
    }
} 

/**
 * Converts bytes to string with given encoding
 * @param bytes Array of bytes
 * @param encoding Encoding of output string. Default is "utf8"
 * @returns string in given encoding
 */
function bytesToString(bytes, encoding="utf8") {
    switch(encoding.toLowerCase()) {
        case "utf8":
            return bytesToUTF8(bytes);
        default:
            throw new Error(`Converting from bytes to string with encoding ${encoding} not implemented yet`);
    }
}

module.exports = {
    stringToBytes,
    bytesToString
}