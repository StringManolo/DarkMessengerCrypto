const PADDING_FIXED = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 256 ).toString(16).padStart(2, '0')).join('').substring(0, size);

const REM_PADDING_FIXED = (paddedString, size) => paddedString.substring(0, paddedString.length - size);

export { PADDING_FIXED, REM_PADDING_FIXED }
