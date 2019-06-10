import mongoose from 'mongoose';
import UserSchema from './schema';
import * as methods from './methods';
import * as virtuals from './virtuals';
import * as validators from './validators';

UserSchema.virtual('password')
  .set(virtuals.setHashedPassword)
  .get(virtuals.getPassword);

UserSchema.method({ ...methods });

UserSchema.path('nickname').validate(validators.nickname);
// UserSchema.path('hashedPassword').validate(validators.password);

export default mongoose.model('User', UserSchema);
