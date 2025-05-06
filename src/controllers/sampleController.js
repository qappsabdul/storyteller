/**
 * Sample controller to demonstrate MVC pattern
 */

// Get all items
exports.getAllItems = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sample items retrieved successfully',
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
  });
};

// Get single item
exports.getItemById = (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    success: true,
    message: `Item ${id} retrieved successfully`,
    data: { id: parseInt(id), name: `Item ${id}` }
  });
};