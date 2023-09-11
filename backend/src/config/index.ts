import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  clientHost: process.env.CLIENT_HOST || 'http://localhost:3000',
  MONGO_DB_URI: process.env.MONGO_DB_URI || '',
  secretJWT: process.env.SECRET_JWT || '',
  emailConfig: {
    host: process.env.SEND_EMAIL_HOST || '',
    user: process.env.SEND_EMAIL_USER || '',
    password: process.env.SEND_EMAIL_PASSWORD || '',
  }
};
