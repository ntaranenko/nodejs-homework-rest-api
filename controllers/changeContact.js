const { updateContact } = require("../models/contacts");
const { updateAfterChangeContact } = require("../schemas/validator");

const controllerShell = (func) => async (req, res) => {
  try {
    const result = await func(req, res);
    return result;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeContact = controllerShell(async (req, res) => {
  const { name, email, phone } = req.body;

  if (name || email || phone) {
    const { error } = updateAfterChangeContact(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const data = await updateContact(req.params.id, req.body);
    if (!data) {
      return res.status(400).json({ message: "Not found" });
    }
    return res.json(data);
  }
  return res.status(400).json({ message: "missing fields" });
});

module.exports = changeContact;
