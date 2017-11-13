import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "../";

const { clientID, clientSecret, callbackURL} = config.strategies.facebook;

const facebookAuth = (response) => {
  return new FacebookStrategy({
    clientID, 
    clientSecret,
    callbackURL
  }, (token, refreshToken, profile, done) => {
    return done(null, profile, response(
      200,
      "Facebook auth",
      { user: profile },
      { token, refreshToken }
    ));
  });
};

export default facebookAuth;