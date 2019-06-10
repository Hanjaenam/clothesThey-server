import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    index: 'hashed',
  },
  title: {
    type: String,
    required: 'title is required',
    index: {
      unique: false,
    },
  },
  content: {
    type: String,
    required: 'content is required',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  imageUrl: {
    type: String,
    required: 'imageSrc is required',
  },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PComment' }],
});

PostSchema.index({ createdAt: -1 });

const model = mongoose.model('Post', PostSchema);

export default model;
