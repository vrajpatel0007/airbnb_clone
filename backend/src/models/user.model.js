const { Schema, model, mongoose } = require("mongoose");
const bcrypt  = require('bcrypt')

const userSchema = new Schema(
  {
    Username: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    Rol: {
      type: String,
      required: true,
      default: "user",
    }
  },
  {
    timestamps: true,
  }
);



const User = model("User", userSchema);

module.exports = User;
