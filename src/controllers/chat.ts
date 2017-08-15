import {APP_CONSTANTS} from "../constants/general";
import * as uuid from "uuid/v4";
export default function chat(io: any) {
  const activeUsers: Array<any> = [];
  const messages: Array<any> = [];

  io.on(APP_CONSTANTS.CONNECTION, (socket: any) => {
    const user = JSON.parse(socket.handshake.query.user);
    if (!user.id) {
      user.id = uuid();
    }
    activeUsers.push(user);

    io.emit(APP_CONSTANTS.NEW_USER, {activeUsers: activeUsers});
    io.emit(APP_CONSTANTS.WELCOME, {user: user, messages: messages, activeUsers: activeUsers});

    socket.on(APP_CONSTANTS.MESSAGE_SENT, (message: any) => {
      messages.push(message);
      io.emit(APP_CONSTANTS.MESSAGE, message);
    });

    socket.on(APP_CONSTANTS.DISCONNECT, () => {
      const userIndex = activeUsers.indexOf(user);
      activeUsers.splice(userIndex, 1);
    });
  });
}
