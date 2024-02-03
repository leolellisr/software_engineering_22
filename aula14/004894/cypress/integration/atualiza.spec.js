describe('test suite', function() {
 
      it('Cadastro de Aluno', function(){
        Cypress.Cookies.preserveOnce()
        cy.setCookie('userAuth', JSON.stringify({"key":"secret", "role":"admin", "nome": "elias"}))
        cy.visit('http://127.0.0.1:3000/')
        cy.contains('ACESSA').click()
        cy.get('[id="ra"]')
          .type('333333')
        cy.get('[id="curso"]')
          .type('Novos Mutantes')
        cy.contains('ATUALIZA').click()
        cy.contains('[id="msg"]', 'Aluno atualizado com sucesso')
      })

  });