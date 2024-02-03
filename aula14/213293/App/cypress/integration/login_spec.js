
  describe('Login Test', () => {
    it('Visits App page', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('LOGOUT').click()
    })

    it('makes login', () => {
      cy.visit('http://localhost:3000/authentication')
      cy.get('[type="text"]').type('art')
      cy.get('[type="password"]').type('123')
      cy.contains('ENVIA').click()
      cy.contains('div', 'Sucesso')
    })
  });