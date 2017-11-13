import { Strategy as LocalStrategy } from "passport-local";
import config from "../";

const localAuth = (response) => {
  return new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: config.jwtCreds.session,
    passReqToCallback: true,
  }, (req, email, pwd, done) => {
    const { email: userEmail, password: userPwd, username } = config.userCreds;
    if (email !== userEmail || pwd !== userPwd) {
      return done(response(404, "Wrong creds", "Wrong creds"))
    }
    return done(null, config.userCreds, response(200, "OK", {
      user: { email, username, password: pwd}
    }));
  });
}

export default localAuth;