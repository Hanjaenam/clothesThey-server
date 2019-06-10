import express from 'express';
import routes from 'routes';
import {
  read,
  create,
  deletePost,
  updatePost,
  onlyMe,
  addLike,
  getLength,
} from 'controllers/postController';
import { onlyPrivate, uploadPostImage, deletePostImage } from 'middlewares';

const postRouter = express.Router();

postRouter.get(routes.read, read);
postRouter.post(routes.create, onlyPrivate, uploadPostImage, create);
postRouter.delete(
  routes.delete,
  onlyPrivate,
  onlyMe,
  deletePostImage,
  deletePost,
);
postRouter.patch(
  routes.update,
  onlyPrivate,
  onlyMe,
  deletePostImage,
  uploadPostImage,
  updatePost,
);
postRouter.get(routes.addLike, onlyPrivate, addLike);
postRouter.get(routes.getLength, getLength);

export default postRouter;
