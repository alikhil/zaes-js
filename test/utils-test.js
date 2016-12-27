"use strict";

const chai = require("chai");
const expect = chai.expect;
const utils = require("../src/utils.js");

describe("utils", () => {
	describe("stringToBytes(str, encoding)", () => {
		it("should return array of char codes for string with encoding UTF8", () => {
			function test(str) {
				let bytes = utils.stringToBytes(str);
				let realBytes = new Array(str.length);
				for (let i = 0; i < str.length; i++) {
					realBytes[i] = str.charCodeAt(i);
				}
				expect(bytes).to.eql(realBytes);
			}
			test("0123");
			test("abbacaba");
			test("d D_0_!_%>");
		});

		it("should return array of char for string with any encoding", () => {
			function test(str, bytesPerChar, realBytes) {
				let bytes = utils.stringToBytes(str, bytesPerChar);
				expect(bytes).to.be.eql(realBytes);
			}
			test("0123", 1, [48, 49, 50, 51]);
			test("топчик", 2, [4, 66, 4, 62, 4, 63, 4, 71, 4, 56, 4, 58]);
			test("自家个測試", 2, [129, 234, 91, 182, 78, 42, 110, 44, 138, 102])

		});
	});

	describe("bytesToString(str, bytesPerChar)", () => {
		it("should convert bytes to string with encoding UTF8(1 byte per character)", () => {
			function test(bytes) {
				let str = utils.bytesToString(bytes);
				let realStr = "";
				for (let i = 0; i < bytes.length; i++) {
					realStr += String.fromCharCode(bytes[i]);
				}
				expect(str).to.equal(realStr);
			}
			test([0, 1, 2, 255]);
			test([0, 100, 56, 48]);
		});

		it("should convert bytes to string with any encoding", () => {
			function test(bytes, bytesPerChar, realStr) {
				let str = utils.bytesToString(bytes, bytesPerChar);
				expect(str).to.be.equal(realStr);
			}
			test([48, 49, 50, 51], 1, "0123");
			test([4, 66, 4, 62, 4, 63, 4, 71, 4, 56, 4, 58], 2, "топчик");
		});
	});

	describe("detectBytesPerChar(str)", () => {
		it("should return minimal number of bytes that need to code each character", () => {
			function test(str, answer) {
				let bytesPerChar = utils.detectBytesPerChar(str);
				expect(bytesPerChar).to.be.equal(answer);
			}
			test("0123a", 1);
			test("топчик еее", 2);
			test("assa 个 domik kek", 2);
		});
	});
});