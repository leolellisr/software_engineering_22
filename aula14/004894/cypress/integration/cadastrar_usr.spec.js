describe('test suite', function() {
  
    it('Cadastrar usr', function(){
      Cypress.Cookies.preserveOnce()
      cy.setCookie('userAuth', JSON.stringify({"key":"secret", "role":"admin", "nome": "elias"}))  
      cy.visit('http://127.0.0.1:3000/cadastrar')
      cy.get('[id="usr2"]')
      .type('batman')
      cy.get('[id="papel"]')
      .select('admin')
      cy.get('[id="pass2"]')
      .type('morcego')
      cy.contains('Insert').click()
      cy.contains('[id="msg2"]', 'sucesso')
    })
   
  });
  