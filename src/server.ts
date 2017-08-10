import * as express from "express";
import * as compression from "compression";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as path from "path";
import * as handlebars from "express-handlebars";
import expressValidator = require("express-validator");
dotenv.config({ path: ".env.example" });
import * as homeController from "./controllers/home";
const app = express();
app.set("port", process.env.PORT || 3000);

app.engine(".hbs", handlebars({defaultLayout: "home", extname: ".hbs"}));
app.set("view engine", ".hbs");

app.use(compression());
app.use(logger("dev"));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

app.get("/", homeController.index);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;