import crypto from 'crypto';

export function makeSalt() {
  return `${Math.round(new Date().valueOf() * Math.random())}`;
}
export function encryptPassword(password, salt) {
  if (salt) {
    return crypto
      .createHmac('sha1', salt)
      .update(password)
      .digest('hex');
  }
  return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex');
}
export function authenticate(password, salt) {
  if (salt) {
    return this.encryptPassword(password, salt) === this.hashedPassword;
  }
  return this.encryptPassword(password) === this.hashedPassword;
}
