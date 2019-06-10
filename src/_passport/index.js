import passport from 'passport';
import User from 'models/User';
import './authenticate';

// cookie에 user.id를 저장한다.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 쿠키에 저장된  user.id를 이용해 세션에 저장할 데이터를 설정한다.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
