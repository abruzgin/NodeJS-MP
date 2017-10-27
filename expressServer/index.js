import express from "express";
import addMiddleware from './app';

const app = express();
const port = process.env.PORT || 8080;
addMiddleware(app);
app.listen(port, () => console.log(`App listening on port ${port}`));