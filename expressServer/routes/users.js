import express from "express";
import * as users from '../controllers/users';

const router = express.Router();

router.get('/', users.getUsers);

export default router;