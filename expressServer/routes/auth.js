import express from "express";
import passport from "passport";
import * as auth from '../controllers/auth';

const router = express.Router();

router.post("/", auth.auth);
router.post("/local", auth.authLocal);

router.get("/twitter", passport.authenticate('twitter'));
router.get("/twitter/callback", auth.authTwitter);

router.get("/facebook", passport.authenticate('facebook'));
router.get("/facebook/callback", auth.authFacebook);

router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", auth.authGoogle);

export default router;