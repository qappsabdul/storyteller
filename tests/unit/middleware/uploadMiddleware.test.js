/**
 * Test file for Upload Middleware
 */

// Mock multer
jest.mock('multer', () => {
  const multerMock = {
    diskStorage: jest.fn().mockReturnValue('diskStorage'),
    mockMiddleware: jest.fn()
  };
  
  return jest.fn().mockImplementation(() => {
    return multerMock.mockMiddleware;
  });
});

const multer = require('multer');
const path = require('path');
const upload = require('../../../src/middleware/uploadMiddleware');

describe('Upload Middleware', () => {
  test('multer should be configured with correct options', () => {
    // Assertions
    expect(multer).toHaveBeenCalledWith({
      storage: 'diskStorage',
      limits: { fileSize: 1000000 },
      fileFilter: expect.any(Function)
    });
  });

  test('diskStorage should be configured with correct options', () => {
    // Assertions
    expect(multer.diskStorage).toHaveBeenCalledWith({
      destination: expect.any(Function),
      filename: expect.any(Function)
    });
  });

  test('fileFilter should accept image files', () => {
    // Get the fileFilter function
    const fileFilter = multer.mock.calls[0][0].fileFilter;
    
    // Mock callback
    const cb = jest.fn();
    
    // Test with valid image file
    const validFile = {
      mimetype: 'image/jpeg',
      originalname: 'test.jpg'
    };
    
    fileFilter({}, validFile, cb);
    
    // Assertions
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  test('fileFilter should reject non-image files', () => {
    // Get the fileFilter function
    const fileFilter = multer.mock.calls[0][0].fileFilter;
    
    // Mock callback
    const cb = jest.fn();
    
    // Test with invalid file
    const invalidFile = {
      mimetype: 'application/pdf',
      originalname: 'test.pdf'
    };
    
    fileFilter({}, invalidFile, cb);
    
    // Assertions
    expect(cb).toHaveBeenCalledWith(expect.any(Error));
    expect(cb.mock.calls[0][0].message).toBe('Only image files are allowed!');
  });
});