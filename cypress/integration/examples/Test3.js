//cypress - Spec
/// <reference types="Cypress" />

describe('Testing click academy page', () => {
    it('Checkbox test', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
      cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
      cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
      cy.get("input[type='checkbox']").check(['option2','option3'])

      //radio Button
      cy.get("input[type='radio']").check('radio2').should('be.checked')

    })

    it('static&dynamic dropdown and visibility of element test', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
      //static dropdwon
      cy.get('select').select('option2').should('have.value','option2')

      //dynamic dropdown
      cy.get('#autocomplete').type('ind')

      cy.get('.ui-menu-item div').each(($el, index, $list) =>{
        if($el.text()==='India'){
          cy.wrap($el).click()
        }
      })
      //check if the value in dropdown is correct
      cy.get('#autocomplete').should('have.value', 'India')


      //checking visibility of elements
      cy.get('#displayed-text').should('be.visible')
      cy.get('#hide-textbox').click()
      cy.get('#displayed-text').should('not.be.visible')
      cy.get('#show-textbox').click()
      cy.get('#displayed-text').should('be.visible')

    })
  })