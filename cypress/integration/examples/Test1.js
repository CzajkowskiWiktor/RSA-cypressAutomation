//cypress - Spec
/// <reference types="Cypress" />

describe('My First Test', () => {
    it('My first test case!', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.get('input.search-keyword').type('ca')
      cy.wait(2000)
      //get all visible elements
      cy.get('.product:visible').should('have.length',4)
      //parent child
      //alias
      cy.get('.products').as('productLocator')
      cy.get('@productLocator').find('.product').should('have.length',4)
      //get the second product from the elements
      cy.get('@productLocator').find('.product').eq(2).contains("ADD TO CART").click().then(()=>{
        console.log('test async')
      })
      //get the specific product by name
      cy.get('@productLocator').find('.product').each(($el, index, $list)=>{
        const textVeg = $el.find('h4.product-name').text()
        
        if(textVeg.includes('Cashews')){
            cy.wrap($el).find('button').click()
        }
      }) 

      //assert if logo text is correctly displayed
      cy.get('.brand').should('have.text', 'GREENKART')
      
      //this is to print in logs
      cy.get('.brand').then((logoelement)=>{
        cy.log(logoelement.text())
      })

    //   const logo = cy.get('.brand')
    //   cy.log(cy.get('.brand').text())
    
      
      

    })
  })