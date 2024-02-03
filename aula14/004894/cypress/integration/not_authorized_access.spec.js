describe('test suite', function() {
  
    it('Visit my server', function(){
      cy.visit('http://127.0.0.1:3000/')
      cy.contains('ACESSA').click()
      cy.contains('[id="msg"]', 'Usuário não autenticado')
    })

  });