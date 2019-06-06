import express from 'express';
import routes from 'routes';
import {
  read,
  create,
  deletePost,
  onlyMe,
  addLike,
} from 'controllers/postController';
import { onlyPrivate, uploadPostImage, deletePostImage } from 'middlewares';

const postRouter = express.Router();

postRouter.get(routes.read, read);
postRouter.post(routes.create, onlyPrivate, uploadPostImage, create);
postRouter.get(routes.delete, onlyPrivate, onlyMe, deletePostImage, deletePost);
postRouter.post(
  routes.update,
  onlyPrivate,
  onlyMe,
  deletePostImage,
  uploadPostImage,
  create,
);
postRouter.get(routes.addLike, onlyPrivate, addLike);

export default postRouter;
