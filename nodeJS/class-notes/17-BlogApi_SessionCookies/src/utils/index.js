// Password Encryption:
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
const { pbkdf2Sync } = require("node:crypto");

const passwordEncrypte = function (password) {
  // require('crypto').randomBytes(32).toString('hex')
  const salt = process.env.SECRET_KEY;
  const iteration = parseInt(process.env.PASS_ITERATION, 10);
  const keylen = parseInt(process.env.PASS_KEYLEN, 10); // write for 64
  const digest = process.env.PASS_DIGEST;

  // pbkdf2Sync returns buffer string.
  return pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex");
};

module.exports = { passwordEncrypte };
