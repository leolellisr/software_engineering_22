describe('Visit Home Page', () => {
  
  //beforeEach(() => {
    // reset and seed the database prior to every test
  //  cy.exec('npm run db:reset && npm run db:seed')

    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
  //  cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
  //    .its('body')
  //    .as('currentUser')
  //})
  
  it('sucessfully loads', () => {
    
    
    cy.visit('/');
    
    cy.window().then((win) => {cy.stub(win, 'open').as('windowOpen')});
    cy.get('button[name=login]').click();
 
    const newUrl = "/authentication";
    cy.get('@windowOpen').should('be.calledWith', newUrl);
    cy.window().then(win => { win.location.href = newUrl; });
    cy.url().should('include', 'authentication')
    cy.get('input[type=text]').type('261900')

    // {enter} causes the form to submit
    cy.get('input[type=password]').type(`${'teste'}{enter}`)
    cy.window().then((win) => {cy.stub(win, 'open').as('windowClose')});

    cy.get('a[class=link]').click();

    const oldUrl = "/";
    //cy.get('@windowClose').should('be.calledWith', oldUrl);
    cy.window().then(win => { win.location.href = oldUrl; });
    cy.url().should('include', '/')
    //cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    

    // Get an input, type into it and verify
    // that the value has been updated
    //cy.get('.action-email')
    //  .type('fake@email.com')
    //  .should('have.value', 'fake@email.com')
  })
})