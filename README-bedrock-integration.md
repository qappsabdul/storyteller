# Amazon Bedrock Integration with Claude Sonnet 3.7

This project integrates Amazon Bedrock to interact with Anthropic's Claude Sonnet 3.7 model.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Configure your AWS credentials in the `.env` file:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   ```

3. Make sure your AWS account has access to Claude Sonnet 3.7 through Amazon Bedrock.

## API Usage

### Generate Text with Claude

**Endpoint:** `POST /api/claude/generate`

**Request Body:**
```json
{
  "prompt": "Your prompt text here",
  "maxTokens": 1024,    // Optional, defaults to 1024
  "temperature": 0.7,   // Optional, defaults to 0.7
  "topP": 0.9           // Optional, defaults to 0.9
}
```

**Response:**
```json
{
  "success": true,
  "response": "Claude's response text"
}
```

## Implementation Details

- `src/services/bedrock.js` - Service that interacts with Amazon Bedrock API
- `src/controllers/claudeController.js` - Handles the API requests for Claude
- `src/routes/claudeRoutes.js` - Defines the Claude API routes

## Error Handling

The API returns appropriate error responses with status codes and error messages when:
- The prompt is missing
- There's an error calling the Bedrock API
- Other unexpected errors occur

## Notes

- The model ID used is `anthropic.claude-3-sonnet-20240229-v1:0`
- Make sure your AWS account has the necessary permissions to use Bedrock services
- To use a different Claude model, update the `modelId` in `src/services/bedrock.js`