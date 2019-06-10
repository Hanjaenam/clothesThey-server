export function setHashedPassword(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password, this.salt);
}

export function getPassword() {
  return this._password;
}
