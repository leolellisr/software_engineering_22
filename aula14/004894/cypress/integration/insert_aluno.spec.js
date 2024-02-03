describe('test suite', function() {
  
    it('Visit my server', function(){
      cy.visit('http://127.0.0.1:3000/')    
    })
  
    it('Login test', function(){
      cy.visit('http://127.0.0.1:3000/authentication')
      cy.get('[type="text"]')
        .type('elias')
      cy.get('[type="password"]')
        .type('kento')
      cy.contains('ENVIA').click()
      cy.contains('div', 'Sucesso')
    })
 
      it('Cadastro de Aluno', function(){
        Cypress.Cookies.preserveOnce()
        cy.setCookie('userAuth', JSON.stringify({"key":"secret", "role":"admin", "nome": "elias"}))
        cy.visit('http://127.0.0.1:3000/')
        cy.get('[id="ra"]')
          .type('444444')
        cy.get('[id="nome"]')
          .type('Peter Parker')
        cy.get('[id="curso"]')
          .type('Vingadores')
        cy.contains('INSERE').click()
        cy.contains('[id="msg"]', 'Aluno inserido com sucesso')
      })

  });