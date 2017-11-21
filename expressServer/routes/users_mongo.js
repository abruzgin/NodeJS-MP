import express from 'express';
import * as users from '../controllers/users_mongo';

const router = express.Router();

router.route("/")
  .get(users.getUsers)
  .post(users.createUser);

router.route("/:id")
  .delete(users.deleteUser);

export default router;