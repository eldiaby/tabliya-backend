const dotenv = require('dotenv');
const path = require('path');

// 🧪 Load environment variables
dotenv.config({ path: path.resolve(__dirname, 'config.env') });

// ✅ Validate required environment variables
if (!process.env.FRONTEND_ORIGIN) {
  throw new Error('❌ FRONTEND_ORIGIN is missing in config.env');
}

if (!process.env.ATLAS_DB_USERNAME) {
  throw new Error('❌ ATLAS_DB_USERNAME is missing in config.env');
}

if (!process.env.ATLAS_DB_PASSWORD) {
  throw new Error('❌ ATLAS_DB_PASSWORD is missing in config.env');
}

if (!process.env.ATLAS_DB_PROJECT) {
  throw new Error('❌ ATLAS_DB_PROJECT is missing in config.env');
}

if (!process.env.ATLAS_DB_URI) {
  throw new Error('❌ ATLAS_DB_URI is missing in config.env');
}

if (!process.env.LOCAL_DB_URI) {
  throw new Error('❌ LOCAL_DB_URI is missing in config.env');
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('❌ JWT_SECRET_KEY is missing in config.env');
}

if (!process.env.JWT_LIFETIME) {
  throw new Error('❌ JWT_LIFETIME is missing in config.env');
}

if (!process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES_IN) {
  throw new Error(
    '❌ JWT_ACCESS_TOKEN_COOKIE_EXPIRES_IN is missing in config.env'
  );
}

if (!process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRES_IN) {
  throw new Error(
    '❌ JWT_REFRESH_TOKEN_COOKIE_EXPIRES_IN is missing in config.env'
  );
}

if (!process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN) {
  throw new Error(
    '❌ PASSWORD_RESET_TOKEN_EXPIRES_IN is missing in config.env'
  );
}

if (!process.env.EMAIL_HOST) {
  throw new Error('❌ EMAIL_HOST is missing in config.env');
}

if (!process.env.EMAIL_PORT) {
  throw new Error('❌ EMAIL_PORT is missing in config.env');
}

if (!process.env.EMAIL_USERNAME) {
  throw new Error('❌ EMAIL_USERNAME is missing in config.env');
}

if (!process.env.EMAIL_PASSWORD) {
  throw new Error('❌ EMAIL_PASSWORD is missing in config.env');
}

if (!process.env.EMAIL_FROM) {
  throw new Error('❌ EMAIL_FROM is missing in config.env');
}

if (!process.env.NODE_ENV) {
  throw new Error('❌ NODE_ENV is missing in config.env');
}

console.log('Environment variables loaded successfully!');
