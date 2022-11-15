const mongoose = require("mongoose")
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is a required field",
    },
    email: {
      type: String,
      trim: true,
      unique: "This email already exists",
      required: "Email field is required",
    },
    hashed_password: {
      type: String,
      required: "Password is a required field",
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password;
  });

userSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.")
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required")
  }
}, null);

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return ""
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ""
  },
}

const User = mongoose.model('user', userSchema)
module.exports = User