import Joi from 'joi';

export const userValidationSchema = Joi.object({
  login: Joi.string().min(5).max(15).alphanum().required(),
  password: Joi.string()
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/)
    .required(),
  age: Joi.number().min(4).max(130).required(),
});

export const loginSubstringValidationSchema = Joi.string().optional();

export const limitValidationSchema = Joi.number().optional();
