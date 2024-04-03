import dotenv from 'dotenv';

dotenv.config();

const config = {
  secret: process.env.SECRETE?.trim() ?? '',
  port: process.env.PORT ?? '3003',
};

export default config;
