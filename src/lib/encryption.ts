// Encryption layers
export type EncryptionLayer = {
  name: string;
  encrypt: (text: string) => string;
  decrypt: (text: string) => string;
};

// Layer 1: Caesar Cipher with custom shift
const caesarCipher: EncryptionLayer = {
  name: 'Caesar Cipher',
  encrypt: (text: string) => {
    return text
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // Uppercase
          return String.fromCharCode(((code - 65 + 3) % 26) + 65);
        }
        if (code >= 97 && code <= 122) { // Lowercase
          return String.fromCharCode(((code - 97 + 3) % 26) + 97);
        }
        return char;
      })
      .join('');
  },
  decrypt: (text: string) => {
    return text
      .split('')
      .map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // Uppercase
          return String.fromCharCode(((code - 65 - 3 + 26) % 26) + 65);
        }
        if (code >= 97 && code <= 122) { // Lowercase
          return String.fromCharCode(((code - 97 - 3 + 26) % 26) + 97);
        }
        return char;
      })
      .join('');
  },
};

// Layer 2: Reverse and XOR
const reverseXOR: EncryptionLayer = {
  name: 'Reverse XOR',
  encrypt: (text: string) => {
    const key = 0x7F; // XOR key
    return text
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) ^ key))
      .reverse()
      .join('');
  },
  decrypt: (text: string) => {
    const key = 0x7F; // XOR key
    return text
      .split('')
      .reverse()
      .map(char => String.fromCharCode(char.charCodeAt(0) ^ key))
      .join('');
  },
};

// Layer 3: Base64 with custom mapping
const base64Custom: EncryptionLayer = {
  name: 'Custom Base64',
  encrypt: (text: string) => {
    const base64 = btoa(text);
    return base64
      .split('')
      .map(char => {
        if (char === '+') return '-';
        if (char === '/') return '_';
        return char;
      })
      .join('');
  },
  decrypt: (text: string) => {
    const base64 = text
      .split('')
      .map(char => {
        if (char === '-') return '+';
        if (char === '_') return '/';
        return char;
      })
      .join('');
    return atob(base64);
  },
};

// All available encryption layers
export const encryptionLayers: EncryptionLayer[] = [
  caesarCipher,
  reverseXOR,
  base64Custom,
];

// Multi-layer encryption
export const encryptMultiLayer = (text: string, layers: number): string => {
  let result = text;
  for (let i = 0; i < layers; i++) {
    const layer = encryptionLayers[i % encryptionLayers.length];
    result = layer.encrypt(result);
  }
  return result;
};

// Multi-layer decryption
export const decryptMultiLayer = (text: string, layers: number): string => {
  let result = text;
  for (let i = layers - 1; i >= 0; i--) {
    const layer = encryptionLayers[i % encryptionLayers.length];
    result = layer.decrypt(result);
  }
  return result;
};
