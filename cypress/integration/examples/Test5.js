/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Frames and child windows', () => {
    it('Child window test!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        
        //get href attribute to get a link
        cy.get('#opentab').then( (el) => {
            const url = el.prop('href')

            cy.visit(url)
            //it is needed to change the origin domain if there is a change of url and there are actions there
            cy.origin(url,() => {
                cy.get("div.sub-menu-bar a[href*='about']").click()
            })

            
        })
    })

    it('iFrames test!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //switch to iframe mode
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.wait(3000);

        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)
        

    })

    
  })