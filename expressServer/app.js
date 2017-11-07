import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import bodyParser from "body-parser";
import router from './routes';

export default function(app) {
  app.use(cookieParser());
  app.use(queryParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  router(app);
};