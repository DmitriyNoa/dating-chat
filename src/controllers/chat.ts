import {APP_CONSTANTS} from "../constants/general";
import User from "../mongoose-models/User";
export default function chat(io: any, db?: any) {
  const activeUsers: Array<any> = [];
  const messages: Array<any> = [];

  io.on(APP_CONSTANTS.CONNECTION, (socket: any) => {
    const connectedUser = JSON.parse(socket.handshake.query.user);
    let actualUser: any;

    const test = new User({
      name: connectedUser.name,
      username: connectedUser.name,
      avatar: connectedUser.avatar
    });

    User.find({username: connectedUser.name}, (err, responce) => {
      if (err) throw err;
      if (responce.length === 0) {
        test.save((err, doc) => {
          if (err) throw err;
          actualUser = doc;
          activeUsers.push(actualUser);
          io.emit(APP_CONSTANTS.WELCOME, {user: actualUser, messages: messages, activeUsers: activeUsers});
          io.emit(APP_CONSTANTS.NEW_USER, {activeUsers: activeUsers});
        });
      } else {
        actualUser = responce[0];
        activeUsers.push(actualUser);
        io.emit(APP_CONSTANTS.WELCOME, {user: actualUser, messages: messages, activeUsers: activeUsers});
        io.emit(APP_CONSTANTS.NEW_USER, {activeUsers: activeUsers});
      }
    });
    socket.on(APP_CONSTANTS.MESSAGE_SENT, (message: any) => {
      messages.push(message);
      io.emit(APP_CONSTANTS.MESSAGE, message);
    });

    socket.on(APP_CONSTANTS.DISCONNECT, function () {
      const userIndex = activeUsers.indexOf(actualUser);
      activeUsers.splice(userIndex, 1);
    });
  });
}
