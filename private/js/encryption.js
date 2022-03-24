/* eslint-disable linebreak-style */
// As a prototype - the encryption will just be a caesar cipher

/**
 * This function encrypts a string
 * using a specified shift with the caesar cipher
 * @param {String} data - the plaintext to be encrypted
 * @param {Integer} shift - The caesar cipher's shift
 * @return {String} The encrypted form of the plaintext
 */
function encrypt(data, shift = 5) {
  const charCodes = [];
  let newCode = 0;
  for (const c of data) {
    const characterCode = c.charCodeAt(0);
    let converted = false;

    // uppercase conversion
    if (characterCode >= 65 && characterCode <= 90) {
      newCode = characterCode + shift;

      if (newCode > 90) {
        newCode -= 26;
      }

      converted = true;
    }

    // lowercase conversion
    if (characterCode >= 97 && characterCode <= 122) {
      newCode = characterCode + shift;

      if (newCode > 122) {
        newCode -= 26;
      }

      converted = true;
    }

    // number conversion
    if (characterCode >= 48 && characterCode <= 57) {
      newCode = characterCode + shift;

      if (newCode > 57) {
        newCode -= 10;
      }

      converted = true;
    }

    if (converted) {
      charCodes.push(newCode);
    } else {
      charCodes.push(characterCode);
    }
  }

  return charCodesToString(charCodes);
}

/**
 * This function decrypts a string
 * using a specified shift with the caesar cipher
 * @param {String} data - the cipher text to be decrypted
 * @param {Integer} shift - The caesar cipher's shift
 * @return {String} The decrypted form of the cipher text
 */
function decrypt(data, shift = 5) {
  const charCodes = [];
  let newCode = 0;

  for (const c of data) {
    const characterCode = c.charCodeAt(0);
    let converted = false;

    // uppercase conversion
    if (characterCode >= 65 && characterCode <= 90) {
      newCode = characterCode - shift;

      if (newCode < 65) {
        newCode += 26;
      }
      converted = true;
    }

    // lowercase conversion
    if (characterCode >= 97 && characterCode <= 122) {
      newCode = characterCode - shift;

      if (newCode < 97) {
        newCode += 26;
      }
      converted = true;
    }

    // number conversion
    if (characterCode >= 48 && characterCode <= 57) {
      newCode = characterCode - shift;

      if (newCode < 48) {
        newCode += 10;
      }
      converted = true;
    }

    if (converted) {
      charCodes.push(newCode);
    } else {
      charCodes.push(characterCode);
    }
  }

  return charCodesToString(charCodes);
}

/**
 * Converts an array of character codes to a string
 * https://stackoverflow.com/questions/40142324/how-to-convert-an-array-of-character-codes-to-string-in-javascript
 * @param {array} chars - an array of character codes
 * @return {String} The string representation of an array of character codes
 */
function charCodesToString(chars) {
  return chars.reduce(function(allString, char) {
    return (allString += String.fromCharCode(char));
  }, '');
}

module.exports = {
  encrypt,
  decrypt,
  charCodesToString,
};
