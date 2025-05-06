# Image Upload Functionality

This document explains how to use the image upload functionality implemented in this Node.js application.

## Setup

1. Make sure you have installed all dependencies:
   ```
   npm install
   ```

2. The application automatically creates an `uploads` directory where all uploaded files will be stored.

## API Endpoints

### Upload a Single Image

**Endpoint:** `POST /api/uploads/single`

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Field name: `image`

**Example using curl:**
```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@/path/to/your/image.jpg" http://localhost:3000/api/uploads/single
```

**Example using Axios:**
```javascript
const formData = new FormData();
formData.append('image', imageFile);

axios.post('http://localhost:3000/api/uploads/single', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

**Successful Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "filename": "1625084582345-image.jpg",
    "path": "uploads/1625084582345-image.jpg"
  }
}
```

### Upload Multiple Images

**Endpoint:** `POST /api/uploads/multiple`

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Field name: `images` (can upload up to 5 images at once)

**Example using curl:**
```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "images=@/path/to/image1.jpg" -F "images=@/path/to/image2.jpg" http://localhost:3000/api/uploads/multiple
```

**Example using Axios:**
```javascript
const formData = new FormData();
formData.append('images', imageFile1);
formData.append('images', imageFile2);

axios.post('http://localhost:3000/api/uploads/multiple', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

**Successful Response:**
```json
{
  "success": true,
  "message": "2 images uploaded successfully",
  "data": [
    {
      "filename": "1625084582345-image1.jpg",
      "path": "uploads/1625084582345-image1.jpg"
    },
    {
      "filename": "1625084582346-image2.jpg",
      "path": "uploads/1625084582346-image2.jpg"
    }
  ]
}
```

## File Access

Uploaded files can be accessed via URL: `http://localhost:3000/uploads/filename.jpg`

## Restrictions

- Only image files (jpg, jpeg, png, gif) are allowed
- Maximum file size is 1MB per file

## Error Handling

The API will return appropriate error messages if:
- No file is uploaded
- The file is not an image
- The file exceeds the size limit