import * as dotenv from 'dotenv';
import { logger } from './logger/logger';

const result = dotenv.config();

export const getConfig = () => {
  if (result.error) {
    logger.error('Dotenv parsing error ', result.error);
    throw result.error;
  }

  return result.parsed;
};

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET_KEY = process.env.SECRET_KEY;
