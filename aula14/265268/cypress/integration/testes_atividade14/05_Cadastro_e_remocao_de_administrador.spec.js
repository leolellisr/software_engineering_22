describe('Cadastro e remoção de administrador', function() {

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

  it('Cadastro de um novo administrador', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="select1"]').select('Administrador')
    cy.get('[id="button2"]').click()
    cy.get('[id="resultado"]').contains('usuário inserido')
    cy.get('[id="button1"]').click()
    cy.get('[id="table1"]').contains('fernando')
    cy.get('[id="table1"]').contains('admin')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Remoção do novo administrador', function() {
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="button1"]').click()
    cy.contains('REMOVE').click()
    cy.get('[id="resultado"]').contains('usuário removido')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="button1"]').click()
    cy.get('[id="button1"]').click()
    cy.get('[id="resultado"]').contains('usuário inexistente')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Confirmação do login', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('root')
  })

});