describe('Cadastro e remoção de aluno', function() {

  it('Confirmação de não logado', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="button1"]').click()
    cy.get('[id="logado"]').contains('não logado')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Tentativa #1 de cadastro de um novo aluno', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="input1"]').clear().type('123456')
    cy.get('[id="input2"]').clear().type('Albert Einstein')
    cy.get('[id="input3"]').clear().type('Física')
    cy.get('[id="button6"]').click()
    cy.get('[id="resultado"]').contains('Usuário não autenticado ou sem autorização')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Cadastro de um novo usuário', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="input2"]').clear().type('teste')
    cy.get('[id="select1"]').select('Usuário')
    cy.get('[id="button2"]').click()
    cy.get('[id="resultado"]').contains('usuário inserido')
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
    cy.get('[id="logado"]').contains('user')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Tentativa #2 de cadastro de um novo aluno', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="input1"]').clear().type('123456')
    cy.get('[id="input2"]').clear().type('Albert Einstein')
    cy.get('[id="input3"]').clear().type('Física')
    cy.get('[id="button6"]').click()
    cy.get('[id="resultado"]').contains('Usuário não autenticado ou sem autorização')
    Cypress.Cookies.preserveOnce('userAuth')
  })

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

  it('Cadastro de um novo aluno', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="input1"]').clear().type('123456')
    cy.get('[id="input2"]').clear().type('Albert Einstein')
    cy.get('[id="input3"]').clear().type('Física')
    cy.get('[id="button6"]').click()
    cy.get('[id="resultado"]').contains('aluno inserido')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Remoção do novo aluno', function() {
    cy.visit('http://127.0.0.1:3000/')
    cy.get('[id="input1"]').clear().type('123456')
    cy.get('[id="button5"]').click()
    cy.contains('REMOVE').click()
    cy.get('[id="resultado"]').contains('aluno removido')
    Cypress.Cookies.preserveOnce('userAuth')
  })

  it('Remoção do novo usuário', function() {
    cy.visit('http://127.0.0.1:3000/usuarios_window')
    cy.get('[id="input1"]').clear().type('fernando')
    cy.get('[id="button1"]').click()
    cy.contains('REMOVE').click()
    cy.get('[id="resultado"]').contains('usuário removido')
  })

});