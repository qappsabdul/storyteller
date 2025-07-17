/**
 * Test file for Bedrock Service
 */

// Mock the AWS SDK
jest.mock('@aws-sdk/client-bedrock-runtime', () => {
  const mockSend = jest.fn();
  return {
    BedrockRuntimeClient: jest.fn().mockImplementation(() => ({
      send: mockSend
    })),
    InvokeModelCommand: jest.fn().mockImplementation((params) => ({
      params
    }))
  };
});

// Mock TextDecoder
global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn().mockImplementation((buffer) => {
    return JSON.stringify({
      content: [{ text: 'This is a test response from Claude' }]
    });
  })
}));

const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { generateWithClaude } = require('../../../src/services/bedrock');

describe('Bedrock Service', () => {
  beforeEach(() => {
    // Reset mock function calls
    jest.clearAllMocks();
    
    // Mock successful response
    const mockResponse = {
      body: Buffer.from('mock response')
    };
    BedrockRuntimeClient.prototype.send.mockResolvedValue(mockResponse);
  });

  test('generateWithClaude should call Bedrock with correct parameters', async () => {
    // Call the service function
    const prompt = 'Test prompt';
    const options = {
      maxTokens: 500,
      temperature: 0.5,
      topP: 0.8
    };
    
    await generateWithClaude(prompt, options);
    
    // Assertions
    expect(InvokeModelCommand).toHaveBeenCalledWith({
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: expect.any(String)
    });
    
    // Check the body content
    const commandCall = InvokeModelCommand.mock.calls[0][0];
    const bodyContent = JSON.parse(commandCall.body);
    
    expect(bodyContent).toEqual({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Test prompt'
            }
          ]
        }
      ],
      temperature: 0.5,
      top_p: 0.8
    });
    
    expect(BedrockRuntimeClient.prototype.send).toHaveBeenCalled();
  });

  test('generateWithClaude should use default options when not provided', async () => {
    // Call the service function with just the prompt
    const prompt = 'Test prompt';
    await generateWithClaude(prompt);
    
    // Check the body content
    const commandCall = InvokeModelCommand.mock.calls[0][0];
    const bodyContent = JSON.parse(commandCall.body);
    
    expect(bodyContent).toEqual({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Test prompt'
            }
          ]
        }
      ],
      temperature: 0.7,
      top_p: 0.9
    });
  });

  test('generateWithClaude should return the text from Claude response', async () => {
    // Call the service function
    const result = await generateWithClaude('Test prompt');
    
    // Assertions
    expect(result).toBe('This is a test response from Claude');
  });

  test('generateWithClaude should handle errors gracefully', async () => {
    // Mock the service to throw an error
    BedrockRuntimeClient.prototype.send.mockRejectedValue(new Error('AWS error'));
    
    // Call the service function
    const result = await generateWithClaude('Test prompt');
    
    // Assertions
    expect(result).toContain('I encountered an error while generating your story');
  });

  test('generateWithClaude should handle empty content in response', async () => {
    // Mock TextDecoder to return empty content
    global.TextDecoder = jest.fn().mockImplementation(() => ({
      decode: jest.fn().mockImplementation(() => {
        return JSON.stringify({
          content: []
        });
      })
    }));
    
    // Call the service function
    const result = await generateWithClaude('Test prompt');
    
    // Assertions
    expect(result).toContain('I couldn\'t generate a story for this image');
  });
});