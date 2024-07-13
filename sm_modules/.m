

function generateColumnOrder(keyword) {
    let columns = keyword.split('').map((char, index) => ({ char, index }));
    columns.sort((a, b) => a.char.localeCompare(b.char));
    return columns.map(column => column.index);
}

const MYSZKOWSKI_ENCRYPT = (plaintext, keyword) => {
    let columnOrder = generateColumnOrder(keyword);
    let numRows = Math.ceil(plaintext.length / keyword.length);
    let grid = Array.from({ length: numRows }, () => Array(keyword.length).fill(''));

    // Rellenar el grid con el texto plano
    for (let i = 0; i < plaintext.length; i++) {
        let row = Math.floor(i / keyword.length);
        let col = i % keyword.length;
        grid[row][col] = plaintext[i];
    }

    // Leer el grid en el orden de las columnas
    let ciphertext = '';
    for (let col of columnOrder) {
        for (let row = 0; row < numRows; row++) {
            if (grid[row][col]) {
                ciphertext += grid[row][col];
            }
        }
    }

    return ciphertext;
}


/*
function myszkowskiDecrypt(ciphertext, keyword) {
    keyword = keyword.toLowerCase();

    let plaintext = "";
    let keywordIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        let cipherChar = ciphertext.charAt(i);
        let keyChar = keyword.charAt(keywordIndex);
        let shiftAmount = keyChar.charCodeAt(0) - 'a'.charCodeAt(0);

        let decryptedChar = String.fromCharCode(((cipherChar.charCodeAt(0) - 'a'.charCodeAt(0) - shiftAmount + 26) % 26) + 'a'.charCodeAt(0));
        plaintext += decryptedChar;

        keywordIndex = (keywordIndex + 1) % keyword.length;
    }

    return plaintext;
}

// Ejemplo de uso:
let plaintext = "Hello World";
let keyword = "keyword";

let encryptedText = myszkowskiEncrypt(plaintext, keyword);
console.log("Texto cifrado:", encryptedText);

let decryptedText = myszkowskiDecrypt(encryptedText, keyword);
console.log("Texto descifrado:", decryptedText);

};
*/

const MYSZKOWSKI_DECRYPT = (encryptedText, key) => {
  // Get the length of the key and encrypted text
  const keyLength = key.length;
  const encryptedTextLength = encryptedText.length;

  // Create a matrix of keyLength x encryptedTextLength
  const matrix = new Array(keyLength);
  for (let i = 0; i < keyLength; i++) {
    matrix[i] = new Array(encryptedTextLength);
  }

  // Get the number of columns in the matrix
  const numColumns = Math.ceil(encryptedTextLength / keyLength);

  // Get the number of additional letters in the last column of the matrix
  const additionalLetters = (keyLength * numColumns) - encryptedTextLength;
  // Sort the key alphabetically
  const sortedKey = key.split('').sort().join('');

  // Get the order of the key
  const keyOrder = new Array(keyLength);
  for (let i = 0; i < keyLength; i++) {
    const letter = key.charAt(i);
    keyOrder[i] = sortedKey.indexOf(letter);
  }

  // Fill the matrix with encrypted text
  let index = 0;
  for (let i = 0; i < keyLength; i++) {
    const column = keyOrder.indexOf(i);
    let columnLetters = numColumns;
    if (column >= keyLength - additionalLetters) {
      columnLetters = numColumns - 1;
    }
    for (let j = 0; j < columnLetters; j++) {
      matrix[column][j] = encryptedText.charAt(index);
      index++;
    }
  }

  // Build the plain text
  let plainText = '';
  for (let j = 0; j < numColumns; j++) {
    for (let i = 0; i < keyLength; i++) {
      if (matrix[i][j]) {
        plainText += matrix[i][j];
      }
    }
  }
  return plainText;
};

export { MYSZKOWSKI_ENCRYPT, MYSZKOWSKI_DECRYPT };

