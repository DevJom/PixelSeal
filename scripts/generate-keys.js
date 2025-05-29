const crypto = require('crypto');
const fs = require('fs');

// Generate AES key (32 bytes for AES-256)
const aesKey = crypto.randomBytes(32).toString('base64');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Create .env content
const envContent = `NEXT_PUBLIC_AES_KEY=${aesKey}
NEXT_PUBLIC_RSA_PUBLIC_KEY=${publicKey}
NEXT_PUBLIC_RSA_PRIVATE_KEY=${privateKey}
`;

// Write to .env file
fs.writeFileSync('.env', envContent);

console.log('Keys generated successfully! Check your .env file.'); 