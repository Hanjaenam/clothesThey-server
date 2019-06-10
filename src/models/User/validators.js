export const USER_VALIDATE_ERROR_MSG = {
  PASSWORD: 'password regex error',
};
export function nickname(nickname) {
  return nickname.length > 0 && nickname.length < 20;
}

export const password = {
  validator() {
    const regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()+=]).*$/;
    return regex.test(this._password);
  },
  message() {
    return USER_VALIDATE_ERROR_MSG.PASSWORD;
  },
};
