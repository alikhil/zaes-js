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
                expect(key).length.to.be.eq(length);
            }
            test(16);
            test(24);
            test(32);
        });

        it("should throw error on passing length different than allowed(16, 24 and 32 bytes)", () => {
            function test(length) {
                assert.throws(() => aes.generateKey(length), Error, "invalid key size");
            }
            test(5);
            test(7);
            test(17);
        });
    });

    
});