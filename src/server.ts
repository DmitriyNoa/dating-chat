import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import {createServer}  from "http";
import * as socketIo from "socket.io";
import * as handlebars from "express-handlebars";
import expressValidator = require("express-validator");
import {APP_CONSTANTS} from "./constants/general";
import chat from "./controllers/chat";
import db from "./controllers/database";
import * as indexRoute from "./routes/index";
const app = express();

class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    this.app.set("port", process.env.PORT || 3000);

    this.app.engine(".hbs", handlebars({defaultLayout: "home", extname: ".hbs"}));
    this.app.set("view engine", ".hbs");

    this.app.use(compression());
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(expressValidator());
    this.app.use(lusca.xframe(APP_CONSTANTS.SAMEORIGIN));
    this.app.use(lusca.xssProtection(true));
    this.app.use(errorHandler());
    const database = db();

    const server = createServer(app);
    const io = socketIo(server);
    chat(io, database);
    server.listen(this.app.get("port"), () => {
      console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
      console.log("  Press CTRL-C to stop\n");
    });
  }

  private routes() {
    let router: express.Router;
    router = express.Router();
    const index: indexRoute.Index = new indexRoute.Index();
    router.get("/", index.index.bind(index.index));
    this.app.use(router);
  }
}

module.exports = Server.bootstrap();
