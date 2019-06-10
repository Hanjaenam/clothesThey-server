import passport from 'passport';
import User from 'models/User';

export const logIn = (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      console.log(err.message);
      return res.status(500).end(err.message);
    }
    if (info) {
      console.log(info.message);
      return res.status(400).json(info.message);
    }
    req.login(user, _err => {
      if (_err) {
        console.log(_err.message);
        return res.status(500).end(_err.message);
      }
      return next();
    });
  })(req, res, next);
};

export const register = (req, res, next) => {
  passport.authenticate('local-register', (err, user, info) => {
    if (err) {
      return res.status(500).end(err.message);
    }
    if (info) {
      return res.status(400).json(info.message);
    }
    req.login(user, _err => {
      if (_err) {
        console.log(_err.message);
        return res.status(500).end(_err.message);
      }
      return next();
    });
  })(req, res, next);
};

export const logOut = (req, res) => {
  if (req.user) {
    req.logout();
    return res.status(200).end();
  }
  return res.status(204).end();
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
      user: { id, email, nickname },
    } = req;
    return res.status(200).json({ id, email, nickname });
  }
  return res.status(204).end();
};
