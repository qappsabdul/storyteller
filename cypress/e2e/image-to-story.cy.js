describe('Image to Story Feature', () => {
  beforeEach(() => {
    cy.visit('/image-to-story');
    cy.intercept('POST', '/api/stories/generate-from-image', {
      statusCode: 200,
      body: {
        success: true,
        story: 'Once upon a time, there was a beautiful landscape. The mountains towered over the valley, where a small village nestled by a serene lake...'
      },
    }).as('generateStory');
  });

  it('should display the Image to Story interface', () => {
    cy.contains('Image to Story Generator');
    cy.get('#imageToStoryForm').should('be.visible');
    cy.get('#image').should('be.visible');
    cy.get('#storyType').should('be.visible');
  });

  it('should upload an image and generate a story', () => {
    // Simulate file upload
    cy.get('#image').selectFile('cypress/fixtures/test-image.jpg', { force: true });
    
    // Select story type
    cy.get('#storyType').select('fantasy');
    
    // Submit form
    cy.get('#generateStoryBtn').click();
    
    // Check loading indicator appears
    cy.get('#loadingIndicator').should('be.visible');
    
    // Wait for API response
    cy.wait('@generateStory');
    
    // Check story appears
    cy.get('#storyContent').should('contain', 'Once upon a time');
  });

  it('should handle API errors gracefully', () => {
    // Override the intercept for this test
    cy.intercept('POST', '/api/stories/generate-from-image', {
      statusCode: 500,
      body: {
        success: false,
        error: 'Failed to generate story'
      },
    }).as('generateStoryError');
    
    // Simulate file upload and submit
    cy.get('#image').selectFile('cypress/fixtures/test-image.jpg', { force: true });
    cy.get('#generateStoryBtn').click();
    
    // Wait for API response
    cy.wait('@generateStoryError');
    
    // Check error message appears
    cy.get('#storyContent').should('contain', 'Error: Failed to generate story');
  });
});