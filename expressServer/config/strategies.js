import { Strategy as LocalStrategy } from "passport-local";
import config from "./";
import { response } from "../bin";

export default function(passport) {
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, pwd, done) => {
    console.log(email, pwd);
    const { email: userEmail, password: userPwd, username } = config.userCreds;
    if (!email || !pwd) {
      return done(response(404, "Insufficient creds", "Insufficient creds"));
    }
    if (email !== userEmail || pwd !== userPwd) {
      return done(response(404, "Wrong creds", "Wrong creds"))
    }
    return done(null, config.userCreds, response(200, "OK", {
      user: { email, username, password: pwd}
    }));
  }))
}