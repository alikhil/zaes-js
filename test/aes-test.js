"use strict";

const chai = require("chai");
const aes = require("../src/aes");
const expect = chai.expect;
const assert = chai.assert;
const utils = require("../src/utils.js");

describe("aes", () => {
	describe("generateKey(length)", () => {
		it("should generate key with given length", () => {
			function test(length) {
				let key = aes.generateKey(length);
				expect(key).to.have.length.is(length);
			}
			test(16);
			test(24);
			test(32);
		});

		it("should throw error on passing length different than allowed(16, 24 and 32 bytes)", () => {
			function test(length) {
				assert.throws(() => aes.generateKey(length), Error, "invalid key length");
			}
			test(5);
			test(7);
			test(17);
		});
	});

	describe("encrypt(str, key)", () => {
		
		it("should throw error on invalid key", () => {
			assert.throws(() => aes.encrypt("data", "1515"), Error, "invalid key length");
		});

		function simpleCase(str, keyLength) {
			let key = aes.generateKey(keyLength);
			let bytes = utils.stringToBytes(str);
			let encrypted = aes.encrypt(bytes, key);
			let decrypted = aes.decrypt(encrypted, key);
			expect(decrypted).to.be.eql(bytes);
		}

		function testAllSimpleCases(keyLength) {
			simpleCase("1337", keyLength);
			simpleCase("azabasefAWQFQ156", keyLength);
			simpleCase("aaaaaaaa$aaaaaaaaaaaaa3abbbbbbt59bbbbbbbbbbbbbbb5)bbbbccccccc_ccccccc", keyLength);
		}

		it("should encrypt any length array with 128 bit key", () => {
			testAllSimpleCases(16);
			//test("русские буквы");
			//test("•Ý¹mÙO_‼|s¬¹Íе£—I♠f⌂5▓");
		});

		it("should encrypt any length array with 192 bit key", () => {
			testAllSimpleCases(24);
		});

		it("should encrypt any length array with 256 bit key", () => {
			testAllSimpleCases(32);
		});

		function testUglyStr(str, keyLength) {
			let key = aes.generateKey(keyLength);
			let bytesPerChar = utils.detectBytesPerChar(str);
			let bytes = utils.stringToBytes(str, bytesPerChar);
			let encrypted = aes.encrypt(bytes, key);
			let decrypted = aes.decrypt(encrypted, key);
			expect(decrypted).to.be.eql(bytes);
			let init = utils.bytesToString(bytes, bytesPerChar);
			expect(init).to.be.equal(str);				
		}

		function testAllUgly(keyLength) {
			testUglyStr(String.fromCharCode(61952), keyLength);
			testUglyStr("㞂⁶ࡠ똊戅숂ࠆ삖ڱh䁥Ŝɴ阄䀚䀋㑐耯⩠෇ဆ〞�鱡洐Ĥ©댐ᡏᬀ瀅退ꊭ钤 ", keyLength);
		}

		it("should encrypt array of bytes of ugly characters with 128 bit key", () => {
			testAllUgly(16);
		});

		it("should encrypt array of bytes of ugly characters with 192 bit key", () => {
			testAllUgly(24);
		});

		it("should encrypt array of bytes of ugly characters with 256 bit key", () => {
			testAllUgly(32);
		});
	});
	
});