/**
 * Test file for Sample Model
 */

const SampleModel = require('../../../src/models/SampleModel');

describe('SampleModel', () => {
  test('should create a new instance with correct properties', () => {
    const sample = new SampleModel(1, 'Test Sample', 'Test Description');
    
    expect(sample).toHaveProperty('id', 1);
    expect(sample).toHaveProperty('name', 'Test Sample');
    expect(sample).toHaveProperty('description', 'Test Description');
    expect(sample).toHaveProperty('createdAt');
    expect(sample.createdAt instanceof Date).toBe(true);
  });

  test('should set default description when not provided', () => {
    const sample = new SampleModel(1, 'Test Sample');
    
    expect(sample).toHaveProperty('description', '');
  });

  test('getAll should return an array of SampleModel instances', () => {
    const samples = SampleModel.getAll();
    
    expect(Array.isArray(samples)).toBe(true);
    expect(samples.length).toBeGreaterThan(0);
    
    samples.forEach(sample => {
      expect(sample instanceof SampleModel).toBe(true);
      expect(sample).toHaveProperty('id');
      expect(sample).toHaveProperty('name');
      expect(sample).toHaveProperty('description');
    });
  });

  test('getById should return a SampleModel with the specified id', () => {
    const id = 5;
    const sample = SampleModel.getById(id);
    
    expect(sample instanceof SampleModel).toBe(true);
    expect(sample).toHaveProperty('id', id);
    expect(sample).toHaveProperty('name', `Sample ${id}`);
    expect(sample).toHaveProperty('description', `Description for sample ${id}`);
  });
});