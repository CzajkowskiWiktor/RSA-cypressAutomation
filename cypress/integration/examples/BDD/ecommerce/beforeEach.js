beforeEach(() => 
{
    cy.fixture('example.json').then(function(data) {
        globalThis.data = data
    })
})