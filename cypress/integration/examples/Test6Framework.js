/// <reference types="Cypress" />
import HomePage from "../examples/pageObjects/HomePage"
import ProductsPage from "../examples/pageObjects/ProductsPage"
import CheckoutPage from "../examples/pageObjects/CheckoutPage"
import PurchasePage from "../examples/pageObjects/PurchasePage"

describe('Testing hooks, POD, etc', () => 
{
    let globalData
    
    before(function() 
    {
        cy.fixture('example.json').then(function(data) {
            globalData = data
        })
    })

    it('Testing is cool!', () => 
    {
        //only applied on this spec
        // Cypress.config('defaultCommandTimeout', 8000)

        //declare our class objects
        const homePage = new HomePage()
        const productsPage = new ProductsPage()
        const checkoutPage = new CheckoutPage()
        const purchasePage = new PurchasePage()
        
        //HomePage
        //declare url env
        cy.visit(Cypress.env('url')+"/angularpractice/")

        homePage.getEditBox().type(globalData.name)
        //get gender
        homePage.getGender().select(globalData.gender)

        //if the output of the name provided is equal to input field value
        homePage.getTwoWayDataBinding().should('have.value', globalData.name)

        //if input have minlength attr equal to 2
        homePage.getEditBox().should('have.attr', 'minlength', '2')

        //if the option is disabled
        homePage.getEntrepreneur().should('be.disabled')

        //pause test
        // cy.pause()

        //shop button click
        homePage.getShopTab().click()

        //find a proper smartphone
        globalData.productName.forEach(element => {
            cy.selectProduct(element)
        });

        //Products Page
        //get to Checkout Page
        productsPage.getCheckoutButton().click()

        //CheckoutPage
        //get total of each product
        var sumProducts = 0

        checkoutPage.getAmountOfProduct().each(($el, index, $list) => 
        {
            //cy.log($el.text())
            const productAmount = $el.text()
            var res = productAmount.split(" ")
            res = Number(res[1].trim())
            sumProducts = Number(sumProducts) + res
            
        }).then(() => 
        {
            //sum of products
            cy.log(sumProducts)
        })

        //get total amount
        checkoutPage.getTotalAmount().then((el) => 
        {
            const totalAmount = el.text()
            var resAmount = totalAmount.split(" ")
            resAmount = Number(resAmount[1].trim())
            
            //assert the amounts
            expect(resAmount).to.equal(sumProducts)
        })
        
        //click checkout btn
        checkoutPage.getCheckoutBtn().click()
        
        //Purchase Page
        //Choose delivery country
        purchasePage.getDeliveryCountry().type(globalData.country)
        purchasePage.getClickCountryFromList().click()
        purchasePage.getCheckbox().click({force: true})
        purchasePage.getPutchaseBtn().click()
        //cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
        purchasePage.getAlertMsg().then((el) => 
        {
            const successMsgDelivery = el.text()
            //make assertion to true
            expect(successMsgDelivery.includes(globalData.successMsg)).to.be.true
        })
        
    
    })

    
  })