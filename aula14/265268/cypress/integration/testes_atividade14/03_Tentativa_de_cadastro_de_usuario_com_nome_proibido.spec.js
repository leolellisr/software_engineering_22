describe('Tentativa de cadastro de usuário com nome proibido', function() {

  it('Login como administrador', function() {
    cy.visit('http://127.0.0.1:3000/authentication')
    cy.get('[id="input1"]').clear().type('root')
    cy.get('[id="input2"]').clear().type('campinas')
    cy.get('[id="button1"]').click()
    cy.get('[id="resultado"]').contains('Sucesso')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Confirmação do login', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('root')
    cy.get('[id="logado"]').contains('admin')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Tentativa de cadastro de um novo usuário com nome proibido', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('admin')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="select1"]').select('Usuário')
    cy.get('[id="button2"]').click()
    cy.get('[id="resultado"]').contains('Usuário não autenticado ou não autorizado')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Tentativa de cadastro de um novo administrador com nome proibido', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('admin')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="select1"]').select('Administrador')
    cy.get('[id="button2"]').click()
    cy.get('[id="resultado"]').contains('Usuário não autenticado ou não autorizado')
  })

});