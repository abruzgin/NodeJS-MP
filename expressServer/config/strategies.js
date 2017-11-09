import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./";
import { response } from "../bin";

const { consumerKey, consumerSecret, callbackUrl: callbackURLTwitter} = config.strategies.twitter;
const { clientID, clientSecret, callbackUrl: callbackURLFb} = config.strategies.facebook;
const { clientID: googleID, clientSecret: googleSecret, callbackUrl: callbackURLGoogle} = config.strategies.google;
export default function(passport) {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser((user, done) => done(null, user));

  passport.use('local', new LocalStrategy({
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
  }));

  passport.use('twitter', new TwitterStrategy({
    consumerKey,
    consumerSecret,
    callbackURL: callbackURLTwitter
  }, (token, tokenSecret, profile, done) => {
    return done(null, profile, response(
      200,
      "Twitter auth",
      { user: profile },
      { token, tokenSecret }
    ));
  }));

  passport.use('facebook', new FacebookStrategy({
    clientID, 
    clientSecret,
    callbackURL: callbackURLFb
  }, (token, refreshToken, profile, done) => {
    return done(null, profile, response(
      200,
      "Facebook auth",
      { user: profile },
      { token, refreshToken }
    ));
  }));

  passport.use('google', new GoogleStrategy({
    clientID: googleID,
    clientSecret: googleSecret,
    callbackURL: callbackURLGoogle
  }, (token, refreshToken, profile, done) => {
    return done(null, profile, response(
      200,
      "Facebook auth",
      { user: profile },
      { token, refreshToken }
    ));
  }));
}