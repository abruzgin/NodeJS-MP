import jwt from "jsonwebtoken";
import config from "../config"
import { response } from "../bin";

const jwtVerifier = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.send(response(404, "No access token"));
  
  return jwt.verify(token, config.jwtCreds.secret, (err, decoded) => {
    if (err) return res.send(response(404, "Wrong access token"));

    const { email, password } = decoded;
    const { email: emailConf, password: pswConf } = config.userCreds;

    if (email !== emailConf || password !== pswConf) return res.send(response(404, "Wrong access token"));

    return next();
  })
}

export default jwtVerifier;