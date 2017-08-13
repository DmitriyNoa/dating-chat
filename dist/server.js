"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const lusca = require("lusca");
const http_1 = require("http");
const socketIo = require("socket.io");
const path = require("path");
const handlebars = require("express-handlebars");
const expressValidator = require("express-validator");
const homeController = require("./controllers/home");
const general_1 = require("./constants/general");
const chat_1 = require("./controllers/chat");
const app = express();
const server = http_1.createServer(app);
const io = socketIo(server);
app.set("port", process.env.PORT || 3000);
app.engine(".hbs", handlebars({ defaultLayout: "home", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe(general_1.APP_CONSTANTS.SAMEORIGIN));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
app.get("/", homeController.index);
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
chat_1.default(io);
/**
 * Start Express server.
 */
server.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
module.exports = app;
//# sourceMappingURL=server.js.map