"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInterestsEncrypted = exports.getInterestsDecrypted = void 0;
const encrypt_1 = require("./encrypt");
function getInterestsDecrypted(data) {
    const decryptedData = (0, encrypt_1.decryptData)(Buffer.from(data));
    const interests = decryptedData.toString().split('_');
    console.log('[]', interests);
    return interests;
}
exports.getInterestsDecrypted = getInterestsDecrypted;
function setInterestsEncrypted(interests) {
    const encryptedData = (0, encrypt_1.encryptData)(Buffer.from(interests.join('_')));
    const data = encryptedData.toString();
    return data;
}
exports.setInterestsEncrypted = setInterestsEncrypted;
//# sourceMappingURL=users.helper.js.map