import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "El campo name esta vacio"],
  },

  email: {
    type: String,
    required: [true, "El campo email esta vacio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "El campo de password esta vacio"],
  },

  img: {
    type: String,
  },

  roles: {
    type: [String],
    default: ["ADMIN_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

export const UserModel = model('User', UserSchema)
