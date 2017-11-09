import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config";
import strategies from "../config/strategies";
import { response } from "../bin";

strategies(passport);

export const auth = (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.send(response(404, "Not found", "No creds"));
  }

  const { email, password } = req.body;
  const { email: emailConf, password: pswConf, username } = config.userCreds;
  if (email !== emailConf || password !== pswConf) {
    return res.send(response(404, "Not found", "Email or password incorrect"));
  }
  
  const payload = {
    email, password
  };

  const token = jwt.sign(payload, config.jwtCreds.secret);

  return res.send(response(200, "OK", {
    user: { email, username, password}
  }, token));
};

export const authLocal = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    return res.send(info);
  })(req, res);
}

export const authTwitter = (req, res) => {
  passport.authenticate("twitter", (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    return res.send(info);
  })(req, res);
}

export const authFacebook = (req, res) => {
  passport.authenticate("facebook", (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    return res.send(info);
  })(req, res);
}

export const authGoogle = (req, res) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.send(err);
    }
    return res.send(info);
  })(req, res);
}