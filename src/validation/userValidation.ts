import { RequestHandler } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema, queryParam: string = ''): RequestHandler => (
  req,
  res,
  next,
) => {
  const { error } = schema.validate(!queryParam ? req.body : req.query[queryParam], {
    abortEarly: false,
    allowUnknown: true,
  });

  console.log(' ERROR ', error);
  if (error) {
    res.status(400).json(`Validation error: ${error}`);
  } else {
    next();
  }
};
