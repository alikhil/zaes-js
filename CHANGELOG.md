### [2.1.0] - 2016-12-30
**Decrypting data that was encrypted with earlier version is not possible by default**
### Changed 
    - Updated jsdoc. Now types of argument and results are specified
    - The structure of encrypted data is changed again. Now uses only first byte to code length of last block.

## [2.0.0] - 2016-12-29 [Yanked]
**This version uncompatible with previous ones!**
### Changed
    - Throws error if invalid data passed to decrypt
    - The structure of encrypted data is changed. First 4 bytes contains information about initial data length.
### Fixed
    - Fixes bug on decrypting with 196 and 256 bit keys
    - Fixed rare bug on encrypting 2 byte symbols

## [1.1.1] - 2016-12-28
### Changed
    - ES6 feature import/export replaced with require/module.exports
    - Readme.md updates tutorial browser initialization part
### Added
    - bundle.zaes.js file to use in browser

## [1.0.1] - 2016-12-27
### Added
    - Adds tutorial in Readme.md

## [1.0.0] - 2016-12-27
### Added
    - Project published to npm.