const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.methods.setPassword = function (pwd) {
  this.password = bcryptjs.hashSync(pwd, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (pwd) {
  return bcryptjs.compareSync(pwd, this.password);
};

userSchema.post("save", handleSaveErrors);

const joiSingUpSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiSingInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const joiUserSchemas = {
  joiSingUpSchema,
  joiSingInSchema,
  joiSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, joiUserSchemas };
