/**
 * Test helper utilities
 */

/**
 * Creates a mock Express request object
 * @param {Object} options - Options to customize the request
 * @param {Object} options.body - Request body
 * @param {Object} options.params - Request params
 * @param {Object} options.query - Request query
 * @param {Object} options.file - Request file (for file uploads)
 * @param {Array} options.files - Request files (for multiple file uploads)
 * @returns {Object} - Mock request object
 */
const mockRequest = (options = {}) => {
  const { body = {}, params = {}, query = {}, file = null, files = [] } = options;
  return {
    body,
    params,
    query,
    file,
    files
  };
};

/**
 * Creates a mock Express response object
 * @returns {Object} - Mock response object with jest functions
 */
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.render = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

/**
 * Creates a mock file object similar to what multer would create
 * @param {Object} options - Options to customize the file
 * @param {string} options.originalname - Original file name
 * @param {string} options.mimetype - File MIME type
 * @param {string} options.filename - Generated filename
 * @param {string} options.path - File path
 * @returns {Object} - Mock file object
 */
const mockFile = (options = {}) => {
  const {
    originalname = 'test.jpg',
    mimetype = 'image/jpeg',
    filename = `${Date.now()}-test.jpg`,
    path = `uploads/${Date.now()}-test.jpg`
  } = options;
  
  return {
    originalname,
    mimetype,
    filename,
    path,
    size: 12345
  };
};

module.exports = {
  mockRequest,
  mockResponse,
  mockFile
};