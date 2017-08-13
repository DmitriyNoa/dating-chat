import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import {createServer}  from "http";
import * as socketIo from "socket.io";
import * as path from "path";
import * as handlebars from "express-handlebars";
import expressValidator = require("express-validator");
import * as homeController from "./controllers/home";
import {APP_CONSTANTS} from "./constants/general";
import chat from "./controllers/chat";
const app = express();
const server = createServer(app);
const io = socketIo(server);
app.set("port", process.env.PORT || 3000);

app.engine(".hbs", handlebars({defaultLayout: "home", extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(lusca.xframe(APP_CONSTANTS.SAMEORIGIN));
app.use(lusca.xssProtection(true));

//app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000}));

app.get("/", homeController.index);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

chat(io);
/**
 * Start Express server.
 */
server.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
