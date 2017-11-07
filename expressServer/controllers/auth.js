import jwt from "jsonwebtoken";
import config from "../config";
import { response } from "../bin";

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