// As a prototype - the encryption will just be a caesar cipher

function encrypt(data, shift = 5) {
  var charCodes = [];
  var newCode = 0;
  for (const c of data) {
    var characterCode = c.charCodeAt(0);
    var converted = false;

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

function decrypt(data, shift = 5) {
  var charCodes = [];
  var newCode = 0;

  for (const c of data) {
    var characterCode = c.charCodeAt(0);
    var converted = false;

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


// https://stackoverflow.com/questions/40142324/how-to-convert-an-array-of-character-codes-to-string-in-javascript
function charCodesToString(chars) {
  return chars.reduce(function (allString, char) {
    return (allString += String.fromCharCode(char));
  }, "");
}

module.exports = {
  encrypt,
  decrypt,
  charCodesToString,
};
