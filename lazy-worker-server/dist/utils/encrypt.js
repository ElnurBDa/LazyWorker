"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.encryptData = void 0;
const crypto_1 = require("crypto");
const alg = 'aes-256-ctr';
let key = 'The Encryption Key';
key = (0, crypto_1.createHash)('sha256').update(String(key)).digest('base64').substr(0, 32);
const encryptData = (data) => {
    const iv = (0, crypto_1.randomBytes)(16);
    const cipher = (0, crypto_1.createCipheriv)(alg, key, iv);
    const result = Buffer.concat([iv, cipher.update(data), cipher.final()]);
    console.log('[encryptData] iv ', iv);
    console.log('[encryptData] result ', result);
    return result;
};
exports.encryptData = encryptData;
const decryptData = (data) => {
    const iv = data.slice(0, 16);
    data = data.slice(16);
    const decipher = (0, crypto_1.createDecipheriv)(alg, key, iv);
    const result = Buffer.concat([decipher.update(data), decipher.final()]);
    console.log('[decryptData] iv ', iv);
    console.log('[decryptData] result ', result);
    return result;
};
exports.decryptData = decryptData;
//# sourceMappingURL=encrypt.js.map