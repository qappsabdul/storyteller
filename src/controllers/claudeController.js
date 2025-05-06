const { generateWithClaude } = require('../services/bedrock');

/**
 * Process a prompt with Claude Sonnet 3.7
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const processPrompt = async (req, res) => {
    try {
        const { prompt, maxTokens, temperature, topP } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const options = {
            maxTokens: maxTokens || 1024,
            temperature: temperature || 0.7,
            topP: topP || 0.9
        };

        const response = await generateWithClaude(prompt, options);
        
        res.json({ 
            success: true, 
            response 
        });
    } catch (error) {
        console.error('Error processing Claude prompt:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Failed to process prompt with Claude' 
        });
    }
};

module.exports = {
    processPrompt
};