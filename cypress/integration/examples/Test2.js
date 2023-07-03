//cypress - Spec
/// <reference types="Cypress" />

describe('Adding the Veg to cart and placing the order', () => {
    it('My first test case!', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.get('input.search-keyword').type('ca')
      cy.wait(2000)

      //parent child
      //alias
      cy.get('.products').as('productLocator')
      //get the specific product by name
      cy.get('@productLocator').find('.product').each(($el, index, $list)=>{
        const textVeg = $el.find('h4.product-name').text()
        
        if(textVeg.includes('Cashews')){
            cy.wrap($el).find('button').click()
        }
      }) 

      cy.get('.cart-icon > img').click()
      cy.contains('PROCEED TO CHECKOUT').click()
      cy.get('button').contains('Place Order').click()



    })
  })