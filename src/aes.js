"use strict";

const secureRandom = require("secure-random");

function isKeyLengthValud(length) {
    return length === 16 ||
        length === 24 ||
        length === 32; 
}

/**
 * Generates random aes key of given length
 * @param length length of key. 16, 24 or 32 bytes
 * @returns {*} array of bytes of given length
 * @throws Error if given invalid key length
 */
function generateKey(length) {
    if (!isKeyLengthValud(length)) {
        throw new Error("invalid key length");
    }
    let array = secureRandom(length);
    return array;
}


module.exports = {
    generateKey
};