import User from "./User.model";
class Message {
  constructor(public message: string, public user: User, id: any) {

  }
}
export default Message;
