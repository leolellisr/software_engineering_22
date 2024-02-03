
  describe('Login Test', () => {
    it('Visits App page', () => {
      cy.visit('http://localhost:3000/')
    })

    it('makes login', () => {
      cy.visit('http://localhost:3000/authentication')
      cy.get('[type="text"]').type('lakfgvbçafd')
      cy.get('[type="password"]').type('sdfasf')
      cy.contains('ENVIA').click()
      cy.contains('div', 'Erro na autenticação')
    })
  });