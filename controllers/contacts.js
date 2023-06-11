const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

// const { schema } = require("../schemas");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res, next) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
