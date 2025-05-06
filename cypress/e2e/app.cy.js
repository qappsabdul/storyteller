describe('AI Tools Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage', () => {
    cy.contains('Welcome to AI Tools');
    cy.contains('Explore the power of AI with our suite of tools');
    cy.get('.card').should('have.length', 3);
  });

  it('should navigate to Claude AI page', () => {
    cy.contains('Try Claude AI').click();
    cy.url().should('include', '/claude');
    cy.contains('Chat with Claude AI');
    cy.get('#promptForm').should('be.visible');
  });

  it('should navigate to Image to Story page', () => {
    cy.contains('Generate a Story').click();
    cy.url().should('include', '/image-to-story');
    cy.contains('Image to Story Generator');
    cy.get('#imageToStoryForm').should('be.visible');
  });

  it('should navigate to File Upload page', () => {
    cy.contains('Upload Files').click();
    cy.url().should('include', '/upload');
    cy.contains('Upload and manage your files securely');
    cy.get('#fileUploadForm').should('be.visible');
  });
});