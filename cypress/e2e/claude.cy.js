describe('Claude AI Feature', () => {
  beforeEach(() => {
    cy.visit('/claude');
    cy.intercept('POST', '/api/claude/generate', {
      statusCode: 200,
      body: {
        success: true,
        response: 'This is a test response from Claude AI.'
      },
    }).as('generatePrompt');
  });

  it('should display the Claude AI chat interface', () => {
    cy.contains('Chat with Claude AI');
    cy.get('#chatMessages').should('be.visible');
    cy.get('#promptForm').should('be.visible');
    cy.get('#prompt').should('be.visible');
    cy.get('#maxTokens').should('be.visible');
    cy.get('#temperature').should('be.visible');
    cy.get('#topP').should('be.visible');
  });

  it('should send a message and receive a response', () => {
    const testPrompt = 'Hello, Claude!';
    cy.get('#prompt').type(testPrompt);
    cy.get('#promptForm').submit();
    
    // Check user message appears
    cy.get('.user-message').should('contain', testPrompt);
    
    // Wait for API response
    cy.wait('@generatePrompt');
    
    // Check Claude response appears
    cy.get('.system-message').should('contain', 'This is a test response from Claude AI.');
  });

  it('should handle API errors gracefully', () => {
    // Override the intercept for this test
    cy.intercept('POST', '/api/claude/generate', {
      statusCode: 500,
      body: {
        success: false,
        error: 'An error occurred'
      },
    }).as('generatePromptError');
    
    cy.get('#prompt').type('This will cause an error');
    cy.get('#promptForm').submit();
    
    // Wait for API response
    cy.wait('@generatePromptError');
    
    // Check error message appears
    cy.get('.error-message').should('contain', 'Error: An error occurred');
  });
});