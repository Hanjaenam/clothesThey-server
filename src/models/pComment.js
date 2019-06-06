import mongoose from 'mongoose';

const PCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'PComment content is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CComment',
    },
  ],
});

const model = mongoose.model('PComment', PCommentSchema);

export default model;
