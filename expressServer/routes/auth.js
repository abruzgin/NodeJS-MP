import express from "express";
import * as auth from '../controllers/auth';

const router = express.Router();

router.post("/", auth.auth);
router.post("/local", auth.authLocal);

export default router;