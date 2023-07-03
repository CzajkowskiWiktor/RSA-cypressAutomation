//cypress - Spec
/// <reference types="Cypress" />

describe('Popups alerts&confirm, child tab etc tests', () => {
    it('Popup test!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()

        //triggering window:alert
        cy.on('window:alert',(str) => {
            //Mocha
            expect(str).to.equal("Hello , share this practice page and share your knowledge")
        })

        //triggering window:confirm
        cy.on('window:confirm',(str) => {
            //Mocha
            expect(str).to.equal("Hello , Are you sure you want to confirm?")
        })

        //child tab window - handling with it - opening in the same page
        // cy.get('#opentab').invoke('removeAttr', 'target').click()

        //navigating browser go back and forward
        // cy.url().should('include','qaclickacademy')
        // cy.go('back')
        // cy.go('forward')


    })

    it('Handling Web tables test!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const courseText = $el.text()

            //getting the sibiling - amount of course
            if(courseText.includes("Python")){
                cy.get("tr td:nth-child(2)").eq(index).next().then((price) => {
                    const coursePrice = price.text()
                    expect(coursePrice).to.equal('25')
                })
            }
          })

    })

    it('Mouse hover test!', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //using show jquery methods 
        // cy.get('div.mouse-hover-content').invoke('show')
        // cy.contains('Top').click()
        // cy.url().should('include', 'top')

        //2 option - cypress can click hidden elements - force : true
        cy.contains('Top').click({ force:true })
        cy.url().should('include', 'top')




    })
  })