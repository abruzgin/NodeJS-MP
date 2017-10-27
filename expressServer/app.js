import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import router from './routes';

export default function(app) {
  app.use(cookieParser());
  app.use(queryParser());
  router(app);
};