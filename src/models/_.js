import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    // match: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  },
  nickname: {
    type: String,
    unique: true,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

function nicknameValidator(nickname) {
  return nickname.length > 0 && nickname.length < 20;
}

UserSchema.path('nickname').validate(nicknameValidator);
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  // passwordValidator(password, cb) {
  //   const regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  //   if (password.match(regex) === null || password === '') {
  //     throw new Generaterr(`${password} is not validate`);
  //   }
  //   cb(null);
  // },
});

const model = mongoose.model('User', UserSchema);

export default model;
