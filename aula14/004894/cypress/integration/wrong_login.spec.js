describe('test suite', function() {
  
    it('Visit my server', function(){
      cy.visit('http://127.0.0.1:3000/')    
    })
  
    it('Wrong Login test', function(){
      cy.visit('http://127.0.0.1:3000/authentication')
      cy.get('[type="text"]')
        .type('kento')
      cy.get('[type="password"]')
        .type('elias')
      cy.contains('ENVIA').click()
      cy.contains('div', 'Erro')
    })
   
  });