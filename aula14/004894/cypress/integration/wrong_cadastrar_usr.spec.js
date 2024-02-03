describe('test suite', function() {
  
    it('Wrong Cadastrar usr', function(){
      Cypress.Cookies.preserveOnce()
      cy.setCookie('userAuth', JSON.stringify({"key":"secret", "role":"admin", "nome": "elias"}))  
      cy.visit('http://127.0.0.1:3000/cadastrar')
      cy.get('[id="usr2"]')
      .type('Thor')
      cy.get('[id="papel"]')
      .select('admin')
      cy.get('[id="pass2"]')
      .type('mjolnir')
      cy.contains('Insert').click()
      cy.get('div#msg3').contains('existente')
    })
   
  });
  