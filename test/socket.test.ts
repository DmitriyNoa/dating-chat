import {} from "jest";
import * as supertest from "supertest";
import * as socketClient from "socket.io-client";
import * as users from "../mocks/server";
import {APP_CONSTANTS} from "../src/constants/general";
import * as app from "../dist/server";
import * as uuidValidate from "uuid-validate";
import Message from "../src/models/Message.model";
import User from "../src/models/User.model";

describe("socket", () => {
  it("should connect to socket and return user with uuid", (done) => {
    supertest(app);
    const userString = JSON.stringify(users.user1);
    const socket = socketClient.connect("http://localhost:3000", {query: "user=" + userString });
    socket.on(APP_CONSTANTS.WELCOME, (message) => {
      const user = message.user;
      expect(user.name).toEqual(users.user1.name);
      expect(user.id).toBeDefined();
      expect(uuidValidate(user.id, 4)).toBeTruthy();
      socket.disconnect();
      done();
    });
  });

  it("should return list of connected users", (done) => {
    supertest(app);
    const userString = JSON.stringify(users.user1);
    const userString2 = JSON.stringify(users.user2);
    const socket1 = socketClient.connect("http://localhost:3000", {query: "user=" + userString });
    const socket2 = socketClient.connect("http://localhost:3000", {query: "user=" + userString2 });

    socket2.on(APP_CONSTANTS.WELCOME, (message) => {
      const connectedUsers = message.activeUsers;
      expect(connectedUsers.length).toEqual(2);
      socket1.disconnect();
      socket2.disconnect();
      done();
    });
  });

  it("should send messages", (done) => {
    supertest(app);
    const userString = JSON.stringify(users.user1);
    const testUser = new User(users.user1.name, "", 1);
    const socket = socketClient.connect("http://localhost:3000", {query: "user=" + userString });
    const userMessage = new Message("I'm Batman", testUser, 11);
    socket.emit(APP_CONSTANTS.MESSAGE_SENT, userMessage);
    socket.on(APP_CONSTANTS.MESSAGE, (message) => {
      expect(message.message).toEqual(userMessage.message);
      expect(message.user.name).toEqual(userMessage.user.name);
      socket.disconnect();
      done();
    });
  });

});
