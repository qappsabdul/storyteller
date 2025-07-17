/**
 * Test file for Upload Controller
 */

const { uploadImage, uploadMultipleImages } = require('../../../src/controllers/uploadController');
const { mockRequest, mockResponse, mockFile } = require('../../utils/testHelpers');

describe('Upload Controller', () => {
  // Mock request and response objects
  let req, res;
  
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  describe('uploadImage', () => {
    test('should return 400 when no file is uploaded', () => {
      // Set up request with no file
      req.file = undefined;
      
      // Call the controller function
      uploadImage(req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No file uploaded'
      });
    });

    test('should return 200 with file info when file is uploaded successfully', () => {
      // Set up request with a file
      const testFile = mockFile();
      req.file = testFile;
      
      // Call the controller function
      uploadImage(req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          filename: testFile.filename,
          path: testFile.path
        }
      });
    });
  });

  describe('uploadMultipleImages', () => {
    test('should return 400 when no files are uploaded', () => {
      // Set up request with no files
      req.files = undefined;
      
      // Call the controller function
      uploadMultipleImages(req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No files uploaded'
      });
    });

    test('should return 400 when empty files array is provided', () => {
      // Set up request with empty files array
      req.files = [];
      
      // Call the controller function
      uploadMultipleImages(req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No files uploaded'
      });
    });

    test('should return 200 with files info when files are uploaded successfully', () => {
      // Set up request with multiple files
      const testFile1 = mockFile({ originalname: 'test1.jpg', filename: 'test-image1.jpg' });
      const testFile2 = mockFile({ originalname: 'test2.jpg', filename: 'test-image2.jpg' });
      req.files = [testFile1, testFile2];
      
      // Call the controller function
      uploadMultipleImages(req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: '2 images uploaded successfully',
        data: [
          {
            filename: testFile1.filename,
            path: testFile1.path
          },
          {
            filename: testFile2.filename,
            path: testFile2.path
          }
        ]
      });
    });
  });
});