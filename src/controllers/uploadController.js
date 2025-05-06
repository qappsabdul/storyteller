/**
 * Controller for handling image uploads
 */

// Upload a single image
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    data: {
      filename: req.file.filename,
      path: req.file.path
    }
  });
};

// Upload multiple images
exports.uploadMultipleImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }
  
  const filesInfo = req.files.map(file => ({
    filename: file.filename,
    path: file.path
  }));
  
  res.status(200).json({
    success: true,
    message: `${req.files.length} images uploaded successfully`,
    data: filesInfo
  });
};