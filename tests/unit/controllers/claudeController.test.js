/**
 * Test file for Claude Controller
 */

// Mock the bedrock service
jest.mock('../../../src/services/bedrock', () => ({
  generateWithClaude: jest.fn()
}));

const { processPrompt } = require('../../../src/controllers/claudeController');
const { generateWithClaude } = require('../../../src/services/bedrock');
const { mockRequest, mockResponse } = require('../../utils/testHelpers');

describe('Claude Controller', () => {
  // Mock request and response objects
  let req, res;
  
  beforeEach(() => {
    req = mockRequest({
      body: {
        prompt: 'Test prompt',
        maxTokens: 500,
        temperature: 0.5,
        topP: 0.8
      }
    });
    res = mockResponse();
    
    // Reset mock function calls
    jest.clearAllMocks();
  });

  test('processPrompt should return a successful response when given valid input', async () => {
    // Mock the service response
    generateWithClaude.mockResolvedValue('This is a test response from Claude');
    
    // Call the controller function
    await processPrompt(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith('Test prompt', {
      maxTokens: 500,
      temperature: 0.5,
      topP: 0.8
    });
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      response: 'This is a test response from Claude'
    });
  });

  test('processPrompt should use default values when options are not provided', async () => {
    // Set up request with only prompt
    req.body = { prompt: 'Test prompt' };
    
    // Mock the service response
    generateWithClaude.mockResolvedValue('This is a test response from Claude');
    
    // Call the controller function
    await processPrompt(req, res);
    
    // Assertions
    expect(generateWithClaude).toHaveBeenCalledWith('Test prompt', {
      maxTokens: 1024,
      temperature: 0.7,
      topP: 0.9
    });
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      response: 'This is a test response from Claude'
    });
  });

  test('processPrompt should return 400 when prompt is missing', async () => {
    // Set up request with missing prompt
    req.body = {};
    
    // Call the controller function
    await processPrompt(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Prompt is required'
    });
    expect(generateWithClaude).not.toHaveBeenCalled();
  });

  test('processPrompt should return 500 when service throws an error', async () => {
    // Mock the service to throw an error
    const errorMessage = 'Service error';
    generateWithClaude.mockRejectedValue(new Error(errorMessage));
    
    // Call the controller function
    await processPrompt(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: errorMessage
    });
  });
});