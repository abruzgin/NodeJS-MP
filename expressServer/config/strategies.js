import { response } from "../bin";
import { local, facebook, twitter, google } from './strategiesDir';

export default function(passport) {
  console.log(local);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use('local', local(response));
  passport.use('twitter', twitter(response));
  passport.use('facebook', facebook(response));
  passport.use('google', google(response));
}