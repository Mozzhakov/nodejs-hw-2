const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required 'name' field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required 'email' field" }),
  phone: Joi.string()
    // .pattern(/\(.*\) .*-/) // number format (xxx) xxx-xxxx
    .max(14)
    .required()
    .messages({ "any.required": "Missing required 'phone' field" }),
  favorite: Joi.boolean().default(false),
});

const updStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { schema, updStatusSchema };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
