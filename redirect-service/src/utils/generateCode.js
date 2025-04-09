const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 7); // generates 7-char codes

module.exports = () => nanoid();
