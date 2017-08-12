import * as express from "express";
import * as compression from "compression";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import {createServer}  from "http";
import * as socketIo from "socket.io";
import * as path from "path";
import * as handlebars from "express-handlebars";
import expressValidator = require("express-validator");
dotenv.config({path: ".env.example"});
import * as homeController from "./controllers/home";
import {APP_CONSTANTS} from "./constants/general";
import * as uuid from "uuid/v4";

const app = express();
const server = createServer(app);
const io = socketIo(server);
app.set("port", process.env.PORT || 3000);

app.engine(".hbs", handlebars({defaultLayout: "home", extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(compression());
app.use(logger("dev"));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.use(lusca.xframe(APP_CONSTANTS.SAMEORIGIN));
app.use(lusca.xssProtection(true));

const activeUsers: Array<any> = [];

io.on(APP_CONSTANTS.CONNECTION, (socket: any) => {
  const user = uuid();
  activeUsers.push(user);
  io.emit(APP_CONSTANTS.WELCOME, {user: user});
  console.log(APP_CONSTANTS.WELCOME);

  socket.on(APP_CONSTANTS.MESSAGE_SENT, (message: any) => {
    io.emit(APP_CONSTANTS.MESSAGE, message);
  });

  socket.on(APP_CONSTANTS.DISCONNECT, function () {
    console.log("user disconnected");
    activeUsers.push(user);
  });
});

app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000}));

app.get("/", homeController.index);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
