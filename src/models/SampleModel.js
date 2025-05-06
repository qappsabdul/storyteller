/**
 * Sample Model - For demonstration purposes
 * In a real application, this would likely connect to a database
 */
class SampleModel {
  constructor(id, name, description = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }

  // Static method to get all samples
  static getAll() {
    // Simulate database fetch
    return [
      new SampleModel(1, 'Sample 1', 'Description for sample 1'),
      new SampleModel(2, 'Sample 2', 'Description for sample 2')
    ];
  }

  // Static method to get a sample by ID
  static getById(id) {
    // Simulate database fetch
    return new SampleModel(id, `Sample ${id}`, `Description for sample ${id}`);
  }
}

module.exports = SampleModel;