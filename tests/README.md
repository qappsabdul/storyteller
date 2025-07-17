# Test Suite Documentation

This directory contains the test suite for the Node.js application. The tests are organized into different categories to ensure comprehensive coverage of the application's functionality.

## Directory Structure

```
tests/
├── unit/                  # Unit tests for individual components
│   ├── controllers/       # Tests for controller functions
│   ├── middleware/        # Tests for middleware functions
│   ├── models/            # Tests for data models
│   └── services/          # Tests for service functions
├── utils/                 # Test utilities and helpers
└── README.md              # This file
```

## Running Tests

To run all tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

To run a specific test file:

```bash
npm test -- tests/unit/controllers/claudeController.test.js
```

## Test Coverage

The test suite covers the following components:

### Controllers
- `claudeController`: Tests for processing prompts with Claude AI
- `imageToStoryController`: Tests for generating stories from images
- `sampleController`: Tests for sample API endpoints
- `uploadController`: Tests for file upload functionality

### Middleware
- `uploadMiddleware`: Tests for file upload configuration and validation

### Models
- `SampleModel`: Tests for the sample data model

### Services
- `bedrock`: Tests for AWS Bedrock integration with Claude AI

## Test Utilities

The `tests/utils` directory contains helper functions to simplify test creation:

- `mockRequest()`: Creates a mock Express request object
- `mockResponse()`: Creates a mock Express response object with Jest spy functions
- `mockFile()`: Creates a mock file object similar to what Multer would create

## Writing New Tests

When adding new functionality to the application, please follow these guidelines for writing tests:

1. Create a new test file in the appropriate directory
2. Use the test utilities from `tests/utils/testHelpers.js` to create mock objects
3. Follow the existing patterns for mocking dependencies
4. Test both success and error scenarios
5. Use descriptive test names that explain what is being tested

## Mocking External Services

For tests that involve external services like AWS Bedrock:

1. Use Jest's mocking capabilities to mock the service
2. Test both successful responses and error handling
3. Verify that the correct parameters are passed to the service

## Example Test

```javascript
const { mockRequest, mockResponse } = require('../../utils/testHelpers');
const { someController } = require('../../../src/controllers/someController');

describe('Some Controller', () => {
  let req, res;
  
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });
  
  test('should do something when called', () => {
    // Test implementation
    someController(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
```