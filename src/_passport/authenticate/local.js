import User from 'models/User';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { USER_VALIDATE_ERROR_MSG } from 'models/User/validators';

export const LOG_IN_ERROR_MSG = {
  EMAIL: {
    EXISTED: ['email', '없는 이메일입니다.'],
  },
  PASSWORD: {
    DIFFERENT: ['password', '비밀번호가 일치하지 않습니다.'],
  },
};

async function localLogin(email, password, done) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: LOG_IN_ERROR_MSG.EMAIL.EXISTED });
    }
    if (!user.authenticate(password)) {
      return done(null, false, {
        message: LOG_IN_ERROR_MSG.PASSWORD.DIFFERENT,
      });
    }
    return done(null, user);
  } catch (err) {
    // email, password 하나라도 없을 시 'Missing credentials' 메시지가 반환된다.
    return done(err);
  }
}

export const REGISTER_ERROR_MSG = {
  EMAIL: {
    EXISTED: ['email', '이미 존재하는 이메일입니다.'],
  },
  PASSWORD: {
    REGEX: ['password', '8-15글자, 최소 하나의 특수문자를 포함해주세요'],
  },
  CONFIRM_PASSWORD: {
    EMPTY: ['confirmPassword', '확인 비밀번호를 입력해주세요'],
    DIFFERENT: ['confirmPassword', '두 비밀번호가 일치하지 않습니다.'],
  },
};

// email, password 없을 시 'Missing credentials' 메시지 반환
async function localRegister(req, email, password, done) {
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return done(null, false, { message: REGISTER_ERROR_MSG.EMAIL.EXISTED });
    }
    const {
      body: { confirmPassword },
    } = req;
    if (!confirmPassword) {
      return done(null, false, {
        message: REGISTER_ERROR_MSG.CONFIRM_PASSWORD.EMPTY,
      });
    }
    if (password !== confirmPassword) {
      return done(null, false, {
        message: REGISTER_ERROR_MSG.CONFIRM_PASSWORD.DIFFERENT,
      });
    }
    const newUser = await User.create({ email, password });
    return done(null, newUser);
  } catch (err) {
    // email, password 하나라도 없을 시 'Missing credentials' 메시지가 반환된다.
    console.log(err);
    return done(err);
  }
}

passport.use(
  'local-login',
  new Strategy(
    { usernameField: 'email', passwordField: 'password' },
    localLogin,
  ),
);

passport.use(
  'local-register',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    localRegister,
  ),
);
