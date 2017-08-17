import * as mongoose from "mongoose";
import {APP_CONSTANTS} from "../constants/general";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: {type: String, required: true, uniqe: true},
  avatar: Number,
  created_at: Date,
  updated_at: Date
});

const User = mongoose.model(APP_CONSTANTS.MODELS.USER, userSchema);

export default User;
