describe('Teste de login 2', function() {

  it('Visitando o servidor', function() {
    cy.visit('http://127.0.0.1:3000/')
  })

  it('Teste de login', function() {
    cy.visit('http://127.0.0.1:3000/authentication')
    cy.get('[id="input1"]').clear().type('root')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="button1"]').click()
    cy.get('[id="resultado"]').contains('Erro')
  })

});