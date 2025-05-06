/**
 * Environment configuration
 * 
 * This file loads environment variables from .env file
 * and provides defaults for required variables.
 */

// In a real app, you would use dotenv package:
// require('dotenv').config();

// Environment variables with defaults
module.exports = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database configuration
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/node-project',
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'development-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug'
};