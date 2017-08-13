"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../constants/general");
const uuid = require("uuid/v4");
function chat(io) {
    const activeUsers = [];
    const messages = [];
    io.on(general_1.APP_CONSTANTS.CONNECTION, (socket) => {
        const user = JSON.parse(socket.handshake.query.user);
        if (!user.id) {
            user.id = uuid();
        }
        activeUsers.push(user);
        io.emit(general_1.APP_CONSTANTS.NEW_USER, { activeUsers: activeUsers });
        io.emit(general_1.APP_CONSTANTS.WELCOME, { user: user, messages: messages, activeUsers: activeUsers });
        socket.on(general_1.APP_CONSTANTS.MESSAGE_SENT, (message) => {
            messages.push(message);
            io.emit(general_1.APP_CONSTANTS.MESSAGE, message);
        });
        socket.on(general_1.APP_CONSTANTS.DISCONNECT, function () {
            const userIndex = activeUsers.indexOf(user);
            activeUsers.splice(userIndex, 1);
        });
    });
}
exports.default = chat;
//# sourceMappingURL=chat.js.map