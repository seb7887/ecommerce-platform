const yup = require("yup");

const validate = async (shape, obj) => {
  const schema = yup.object().shape(shape);

  try {
    const valid = await schema.validate(obj);
    return valid;
  } catch (err) {
    throw err;
  }
};

module.exports = validate;
