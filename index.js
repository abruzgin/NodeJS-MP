import path from "path";
import EventEmitter from "events";
import config from "./config";
import { User, Product, DirWatcher, Importer } from "./models";

const emitter = new EventEmitter();

const user = new User();
const product = new Product();
const importer = new Importer(emitter);
const dirwatcher = new DirWatcher(emitter);

console.log(config.name);
dirwatcher.watch(path.join(__dirname, "data"), 500);