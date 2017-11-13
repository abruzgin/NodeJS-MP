import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../";

const { clientID, clientSecret, callbackURL} = config.strategies.google;

const googleAuth = (response) => {
  return new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, (token, refreshToken, profile, done) => {
    return done(null, profile, response(
      200,
      "Google auth",
      { user: profile },
      { token, refreshToken }
    ));
  })
};

export default googleAuth;