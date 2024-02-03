describe('Creating new Aluno Test', () => {
    it('makes login', () => {
        cy.visit('http://localhost:3000/authentication')
        cy.get('[type="text"]').type('art')
        cy.get('[type="password"]').type('123')
        cy.contains('ENVIA').click()
        cy.contains('div', 'Sucesso')
    })
    it('Visits App page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[id="ra"]')
          .type('123456')
        cy.get('[id="nome"]').type('IRMÃO DO JOREL')
        cy.get('[id="curso"]').type('quinta série')
        cy.contains('INSERE').click()
        cy.contains('[id="msg"]', 'aluno inserido')
      })
  });