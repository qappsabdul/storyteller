/**
 * Test file for Image to Story Controller
 */

// Mock the fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn()
}));

// Mock the bedrock service
jest.mock('../../../src/services/bedrock', () => ({
  generateWithClaude: jest.fn()
}));

const fs = require('fs');
const { generateStoryFromImage } = require('../../../src/controllers/imageToStoryController');
const { generateWithClaude } = require('../../../src/services/bedrock');
const { mockRequest, mockResponse, mockFile } = require('../../utils/testHelpers');

describe('Image to Story Controller', () => {
  // Mock request and response objects
  let req, res;
  
  beforeEach(() => {
    const testFile = mockFile();
    req = mockRequest({
      file: testFile,
      body: {}
    });
    res = mockResponse();
    
    // Reset mock function calls
    jest.clearAllMocks();
    
    // Mock fs.readFileSync to return a buffer
    const mockImageBuffer = Buffer.from('fake-image-data');
    fs.readFileSync.mockReturnValue(mockImageBuffer);
    
    // Mock generateWithClaude to return a story
    generateWithClaude.mockResolvedValue('This is a generated story about the image.');
  });

  test('should return 400 when no image is uploaded', async () => {
    // Set up request with no file
    req.file = undefined;
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'No image uploaded'
    });
    expect(generateWithClaude).not.toHaveBeenCalled();
  });

  test('should generate a children story by default when storyType is not provided', async () => {
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith('uploads/test-image.jpg');
    expect(generateWithClaude).toHaveBeenCalledWith(
      expect.stringContaining('Create a gentle, imaginative story suitable for children'),
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Story generated successfully',
      story: 'This is a generated story about the image.',
      data: {
        story: 'This is a generated story about the image.',
        image: {
          filename: 'test-image.jpg',
          path: 'uploads/test-image.jpg'
        }
      }
    });
  });

  test('should generate an adventure story when storyType is adventure', async () => {
    // Set up request with adventure story type
    req.body.storyType = 'adventure';
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith(
      expect.stringContaining('Create an exciting adventure story with action and suspense'),
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('should generate a mystery story when storyType is mystery', async () => {
    // Set up request with mystery story type
    req.body.storyType = 'mystery';
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith(
      expect.stringContaining('Write a mysterious story with intrigue and unexpected twists'),
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('should generate a sci-fi story when storyType is scifi', async () => {
    // Set up request with sci-fi story type
    req.body.storyType = 'scifi';
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith(
      expect.stringContaining('Craft a science fiction story with futuristic elements'),
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('should generate a fantasy story when storyType is fantasy', async () => {
    // Set up request with fantasy story type
    req.body.storyType = 'fantasy';
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith(
      expect.stringContaining('Write a fantasy story with magical elements and creatures'),
      expect.any(Object)
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('should return 500 when service throws an error', async () => {
    // Mock the service to throw an error
    const errorMessage = 'Service error';
    generateWithClaude.mockRejectedValue(new Error(errorMessage));
    
    // Call the controller function
    await generateStoryFromImage(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: errorMessage
    });
  });
});