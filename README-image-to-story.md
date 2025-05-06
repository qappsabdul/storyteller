# Image to Story Generation

This feature allows users to upload images and receive AI-generated stories based on the content of those images. The implementation leverages Claude Sonnet 3.7 via AWS Bedrock to analyze images and create creative stories.

## How to Use

### Endpoint

```
POST /api/stories/generate-from-image
```

### Request Format

Send a multipart/form-data request with an image file:

```
Key: image
Value: [your-image-file]
```

### Response Format

```json
{
  "success": true,
  "message": "Story generated successfully",
  "data": {
    "story": "The AI-generated story text...",
    "image": {
      "filename": "uploaded-image-filename.jpg",
      "path": "uploads/uploaded-image-filename.jpg"
    }
  }
}
```

## Implementation Details

1. The application receives an image upload through the endpoint
2. The image is processed by the upload middleware and saved to the file system
3. The image is read from the file system and converted to base64 format
4. The base64 image is included in a prompt sent to Claude AI via AWS Bedrock
5. Claude analyzes the image content and generates a creative story
6. The story is returned to the client along with references to the uploaded image

## Error Handling

The endpoint includes error handling for various scenarios:
- Missing image uploads
- File processing errors
- AI service errors

Each error returns an appropriate status code and error message.