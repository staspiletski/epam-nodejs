import Joi from 'joi';

export const groupValidationSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  permissions: Joi.array().min(1).max(5).required(),
});
