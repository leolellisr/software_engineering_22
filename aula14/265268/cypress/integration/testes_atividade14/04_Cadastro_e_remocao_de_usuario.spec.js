describe('Cadastro e remoção de usuário', function() {

  it('Confirmação de não logado', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('não logado')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Cadastro de um novo usuário', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="select1"]').select('Usuário')
    cy.get('[id="button2"]').click()
    cy.get('[id="resultado"]').contains('usuário inserido')
    cy.get('[id="button1"]').click()
    cy.get('[id="resultado"]').contains('Usuário não autenticado ou não autorizado')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Login como o novo usuário', function() {
    cy.visit('http://127.0.0.1:3000/authentication')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="button1"]').click()
    cy.get('[id="resultado"]').contains('Sucesso')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Confirmação do login', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('fernando')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Remoção do novo usuário', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="button1"]').click()
    cy.contains('REMOVE').click()
    cy.get('[id="resultado"]').contains('usuário removido')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Confirmação de não logado', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('não logado')
  })

});