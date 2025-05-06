const fs = require('fs');
const { generateWithClaude } = require('../services/bedrock');
const path = require('path');

/**
 * Generate a story from an uploaded image
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const generateStoryFromImage = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image uploaded'
            });
        }

        // Get file path and read image
        const filePath = req.file.path;
        const imageBuffer = fs.readFileSync(filePath);
        
        // Convert image to base64
        const base64Image = imageBuffer.toString('base64');
        
        // Get story type from request or use default
        const storyType = req.body.storyType || 'children';
        
        // Create story type specific instructions
        let storyInstructions = '';
        switch(storyType) {
            case 'adventure':
                storyInstructions = 'Create an exciting adventure story with action and suspense.';
                break;
            case 'mystery':
                storyInstructions = 'Write a mysterious story with intrigue and unexpected twists.';
                break;
            case 'scifi':
                storyInstructions = 'Craft a science fiction story with futuristic elements.';
                break;
            case 'fantasy':
                storyInstructions = 'Write a fantasy story with magical elements and creatures.';
                break;
            default:
                storyInstructions = 'Create a gentle, imaginative story suitable for children.';
        }
        
        // Prepare prompt for Claude
        const prompt = `Generate a creative story based on this image. ${storyInstructions} Be descriptive and imaginative about what you see in the image and craft a compelling narrative around it. The story should be approximately 300-500 words.

[IMAGE: data:${req.file.mimetype};base64,${base64Image}]`;

        // Options for Claude
        const options = {
            maxTokens: 2048, // Increased token limit for longer stories
            temperature: 0.8, // Slightly higher temperature for creativity
            topP: 0.9
        };

        console.log('Sending request to Claude...');
        
        // Generate story using Claude
        const storyText = await generateWithClaude(prompt, options);
        
        console.log('Received response from Claude');
        
        // Return success response with story
        res.status(200).json({
            success: true,
            message: 'Story generated successfully',
            story: storyText, // Changed to match frontend expectation
            data: {
                story: storyText,
                image: {
                    filename: req.file.filename,
                    path: req.file.path
                }
            }
        });

    } catch (error) {
        console.error('Error generating story from image:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate story from image'
        });
    }
};

module.exports = {
    generateStoryFromImage
};

module.exports = {
    generateStoryFromImage
};