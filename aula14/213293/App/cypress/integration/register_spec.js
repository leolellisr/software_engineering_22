describe('Registe Test', () => {
    it('Visits App page', () => {
      cy.visit('http://localhost:3000/')
    })

    it('makes login', () => {
      cy.visit('http://localhost:3000/authentication')
      cy.get('[type="text"]').type('art')
      cy.get('[type="password"]').type('123')
      cy.contains('ENVIA').click()
      cy.contains('div', 'Sucesso')
    })

    it('makes registration', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[type="text"]')
          .type('brtt')
        cy.get('[v-model="selected"]').select('user')
        cy.get('[type="key"]').type('123')
        cy.contains('Registrar').click()
        cy.contains('[id="msg"]', '{ "resultado": "usuário inserido" }')
    })
  });