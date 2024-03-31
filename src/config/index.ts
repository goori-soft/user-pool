import dotenv from 'dotenv';

dotenv.config();

const config = {
  secret: process.env.SECRETE?.trim() ?? '',
};

export default config;
