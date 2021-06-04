const joi = require("joi");
const { ValidationError } = require('@proptree/proptree-lib/lib/error-types')

module.exports.validateBody = body => {
  const schema = joi.object({
    id: joi.string().required(),
  }).unknown(true);
  
  const validation = schema.validate(body);
  if (validation.error) {
    throw new ValidationError(validation.error)
  }
  return validation
};

module.exports.validateQueryParam = body => {
  const schema = joi.object({
    listingName: joi.string(),
  })//.unknown(true);
  
  const validation = schema.validate(body);
  if (validation.error) {
    throw new ValidationError(validation.error)
  }
  return validation
};