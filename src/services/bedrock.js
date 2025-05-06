const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// Initialize the Bedrock client with credentials
const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});

/**
 * Generates a response using Claude Sonnet 3.7 via Amazon Bedrock
 * @param {string} prompt - The user's prompt
 * @param {Object} options - Additional options for Claude
 * @param {number} options.maxTokens - Maximum tokens to generate (defaults to 1024)
 * @param {number} options.temperature - Temperature for generation (defaults to 0.7)
 * @param {number} options.topP - Top-p for nucleus sampling (defaults to 0.9)
 * @returns {Promise<string>} - The generated text response
 */
const generateWithClaude = async (prompt, options = {}) => {
    const {
        maxTokens = 1024,
        temperature = 0.7,
        topP = 0.9
    } = options;

    // Claude Sonnet 3.7 model ID
    const modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';

    // Create the request body according to Bedrock's Claude API format
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: maxTokens,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: prompt
                    }
                ]
            }
        ],
        temperature: temperature,
        top_p: topP
    };

    try {
        console.log('Sending request to Bedrock with model:', modelId);
        
        const command = new InvokeModelCommand({
            modelId,
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify(payload)
        });

        const response = await bedrockClient.send(command);
        console.log('Received response from Bedrock');
        
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        console.log('Response structure:', Object.keys(responseBody));
        
        // For debugging
        if (!responseBody.content || responseBody.content.length === 0) {
            console.error('No content in response:', responseBody);
            return "I couldn't generate a story for this image. Please try again with a different image.";
        }
        
        return responseBody.content[0].text;
    } catch (error) {
        console.error('Error calling Claude via Bedrock:', error);
        
        // Return a fallback response instead of throwing
        return "I encountered an error while generating your story. This might be due to AWS credentials not being configured correctly. Please check your AWS Bedrock setup and try again.";
    }
};

module.exports = {
    generateWithClaude
};