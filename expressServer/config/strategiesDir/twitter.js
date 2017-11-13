import { Strategy as TwitterStrategy } from "passport-twitter";
import config from "../";

const { consumerKey, consumerSecret, callbackURL} = config.strategies.twitter;

const twitterAuth = (response) => {
  return new TwitterStrategy({
    consumerKey,
    consumerSecret,
    callbackURL
  }, (token, tokenSecret, profile, done) => {
    return done(null, profile, response(
      200,
      "Twitter auth",
      { user: profile },
      { token, tokenSecret }
    ));
  })
};

export default twitterAuth;