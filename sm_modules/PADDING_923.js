const PADDING_923 = (size) => {
  let padding = "\x61".repeat(size - 1);
  padding += String.fromCharCode(size);
  return padding;
}

const REM_PADDING_923 = (paddedString) => {
  const paddingLength = paddedString.charCodeAt(paddedString.length - 1);
  const originalLength = paddedString.length - paddingLength;
  return paddedString.substring(0, originalLength);
}


export { PADDING_923, REM_PADDING_923 }
