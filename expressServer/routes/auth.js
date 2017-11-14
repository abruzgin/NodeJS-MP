import express from "express";
import passport from "passport";
import * as auth from '../controllers/auth';

const router = express.Router();

router.post("/", auth.auth);
router.post("/local", auth.authPassport('local'));

router.get("/twitter", passport.authenticate('twitter'));
router.get("/twitter/callback", auth.authPassport('twitter'));

router.get("/facebook", passport.authenticate('facebook'));
router.get("/facebook/callback", auth.authPassport('facebook'));

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", auth.authPassport('google'));

export default router;