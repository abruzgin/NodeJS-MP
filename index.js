import path from "path";
import config from "./config";
import { User, Product, DirWatcher } from "./models";

const user = new User();
const product = new Product();
const dirwatcher = new DirWatcher();

console.log(config.name);
dirwatcher.watch(path.join(__dirname, "data"), 500);