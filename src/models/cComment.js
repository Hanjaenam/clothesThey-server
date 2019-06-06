import mongoose from 'mongoose';

const CCommnetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'CComment content is reuiqred',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const model = mongoose.model('CCommentSchema', CCommnetSchema);

export default model;
