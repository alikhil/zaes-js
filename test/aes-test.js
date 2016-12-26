"use strict";

const chai = require("chai");
const aes = require("../src/aes");
const expect = chai.expect;
const assert = chai.assert;

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

        it("should encrypt string of any length with given key that will decryptable by decrypt() function", () => {
            function test(str, key) {
                let encrypted = aes.encrypt(str, key);
                let decrypted = aes.decrypt(encrypted, key);
                expect(decrypted).to.be.equal(str);
            }
            test("1337");
            test("русские буквы");
            test("•Ý¹mÙO_‼|s¬¹Íе£—I♠f⌂5▓");
            test("aaaaaaaa$aaaaaaaaaaaaa3abbbbbbt59bbbbbbbbbbbbbbb5)bbbbccccccc_ccccccc");
        });
    });
    
});