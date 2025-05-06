/**
 * Test file for Sample Controller
 */

describe('Sample Controller', () => {
  // Mock request and response objects
  let req, res;
  
  beforeEach(() => {
    req = {
      params: { id: '1' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // Import controller functions
  const { getAllItems, getItemById } = require('../../../src/controllers/sampleController');

  test('getAllItems should return a list of items with status 200', () => {
    // Call the controller function
    getAllItems(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Sample items retrieved successfully',
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String)
          })
        ])
      })
    );
  });

  test('getItemById should return a single item with status 200', () => {
    // Call the controller function
    getItemById(req, res);
    
    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Item 1 retrieved successfully',
        data: expect.objectContaining({
          id: 1,
          name: 'Item 1'
        })
      })
    );
  });
});