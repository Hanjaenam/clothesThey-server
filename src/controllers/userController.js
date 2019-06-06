import passport from 'passport';
import User from 'models/User';
import Generaterr from 'generaterr';

export const logIn = passport.authenticate('local');

export const register = async (req, res, next) => {
  const {
    body: { email, password, confirmPassword },
  } = req;
  if (password !== confirmPassword) {
    console.log(
      new Generaterr(`${password} and ${confirmPassword} is diffrent`),
    );
    return res.status(400).end();
  }
  try {
    const user = await new User({ email });
    await User.register(user, password);
    return next();
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};

export const logOut = (req, res) => {
  if (req.user) {
    req.logout();
    return res.status(200).end();
  }
  return res.status(404).end();
};

export const patchUser = async (req, res) => {
  const {
    body: { nickname },
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      nickname,
    });
    req.user.nickname = nickname;
    return res.status(200).end();
  } catch (e) {
    return res.status(500).end();
  }
};

export const getUser = (req, res) => {
  if (req.user) {
    const {
      user: { email, nickname },
    } = req;
    return res.status(200).json({ email, nickname });
  }
  return res.status(204).end();
};
