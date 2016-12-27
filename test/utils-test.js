"use strict";

const chai = require("chai");
const expect = chai.expect;
const utils = require("../src/utils.js");

describe("utils", () => {
	describe("stringToBytes(str, encoding)", () => {
		it("should return array of char codes for string with encoding UTF8", () => {
			function test(str) {
				let bytes = utils.stringToBytes(str, "utf8");
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
	});

	describe("bytesToString(str, encoding)", () => {
		it("should convert bytes to string with encoding UTF8", () => {
			function test(bytes) {
				let str = utils.bytesToString(bytes, "utf8");
				let realStr = "";
				for (let i = 0; i < bytes.length; i++) {
					realStr += String.fromCharCode(bytes[i]);
				}
				expect(str).to.equal(realStr);
			}
			test([0, 1, 2, 255]);
			test([0, 100, 56, 48]);
		});
	});
});