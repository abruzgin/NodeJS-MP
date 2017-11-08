import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import router from './routes';

export default function(app) {
  app.use(passport.initialize());
  app.use(cookieParser());
  app.use(queryParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  router(app);
};