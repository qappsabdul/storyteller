/**
 * Test utilities for common testing operations
 */

/**
 * Creates mock request objects for testing middleware and controllers
 * 
 * @param {Object} options - Configuration options
 * @param {Object} options.body - Request body
 * @param {Object} options.params - Route parameters
 * @param {Object} options.query - Query parameters
 * @param {Object} options.headers - Request headers
 * @param {Object} options.user - Authenticated user object
 * @returns {Object} A mock request object
 */
const mockRequest = ({
  body = {},
  params = {},
  query = {},
  headers = {},
  user = null
} = {}) => ({
  body,
  params,
  query,
  headers,
  user,
  originalUrl: 'http://example.com/test'
});

/**
 * Creates mock response objects for testing middleware and controllers
 * 
 * @returns {Object} A mock response object with jest functions
 */
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  return res;
};

/**
 * Creates mock next function for testing middleware
 * 
 * @returns {Function} A jest mock function
 */
const mockNext = () => jest.fn();

module.exports = {
  mockRequest,
  mockResponse,
  mockNext
};