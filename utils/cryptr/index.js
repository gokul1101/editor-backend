const Cryptr = require("cryptr");
const { ENCRPYTION_KEY } = require("../../config");
const cryptr = new Cryptr(ENCRPYTION_KEY);

const encryption = (data) => {
  data = JSON.stringify(data);
  return cryptr.encrypt(data);
};

const decryption = (data) => {
  data = cryptr.decrypt(data);
  return JSON.parse(data);
};

module.exports = {
  encryption,
  decryption,
};
