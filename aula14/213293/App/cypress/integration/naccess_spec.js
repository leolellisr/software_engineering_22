describe('Non autorized access test', () => {
    it('Visits App page', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('ACESSA').click()
        cy.contains('[id="msg"]', 'Usuário não autenticado - Faça login primeiro')
      })
});