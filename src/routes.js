// user
const USER = '/user';
const LOG_IN = '/logIn';
const LOG_OUT = '/logOut';
const REGISTER = '/register';
const GET_USER = '/getUser';
const PATCH = '/patch';

// post
const POST = '/post';
const ADD_LIKE = '/addLike/:id';
// post comment
const P_COMMENT = '/pComment';
// comment comment
const C_COMMENT = '/cComment';
// CRUD
const READ = '/read/:category';
const CREATE = '/create';
const DELETE = '/delete';
const UPDATE = '/update';

const routes = {
  // USER
  user: USER,
  logIn: LOG_IN,
  logOut: LOG_OUT,
  register: REGISTER,
  getUser: GET_USER,
  patch: PATCH,
  // POST
  post: POST,
  addLike: ADD_LIKE,
  pComment: P_COMMENT,
  cComment: C_COMMENT,
  read: READ,
  create: CREATE,
  delete: DELETE,
  update: UPDATE,
};

export default routes;
