const { removeContact } = require("../models/contacts");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
