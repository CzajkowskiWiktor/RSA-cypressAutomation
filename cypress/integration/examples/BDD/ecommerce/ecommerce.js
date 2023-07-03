import { Given,When,Then,And } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pageObjects/HomePage"
import ProductsPage from "../../pageObjects/ProductsPage"
import CheckoutPage from "../../pageObjects/CheckoutPage"
import PurchasePage from "../../pageObjects/PurchasePage"

//declare our class objects
const homePage = new HomePage()
const productsPage = new ProductsPage()
const checkoutPage = new CheckoutPage()
const purchasePage = new PurchasePage()

let nameInput

Given('I open Ecommerce page', () => 
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

When('I add items to cart', () =>
{
    //shop button click
    homePage.getShopTab().click()

    //find a proper smartphone
    globalThis.data.productName.forEach(element => {
        cy.selectProduct(element)
    });

    //Products Page
    //get to Checkout Page
    productsPage.getCheckoutButton().click()
})

When('Validate the total price of added products', () =>
{
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
    
})

Then('Select the country, submit and verify success message', () =>
{
    //click checkout btn
    checkoutPage.getCheckoutBtn().click()
        
    //Purchase Page
    //Choose delivery country
    purchasePage.getDeliveryCountry().type(globalThis.data.country)
    purchasePage.getClickCountryFromList().click()
    purchasePage.getCheckbox().click({force: true})
    purchasePage.getPutchaseBtn().click()

    purchasePage.getAlertMsg().then((el) => 
    {
        const successMsgDelivery = el.text()
        //make assertion to true
        expect(successMsgDelivery.includes(globalThis.data.successMsg)).to.be.true
    })
})

When('I fill the form details', (dataTable) => 
{
    // homePage.getEditBox().type(globalThis.data.name)
    // homePage.getGender().select(globalThis.data.gender)
    
    nameInput = dataTable.rawTable[1][0]
    homePage.getEditBox().type(nameInput)
    homePage.getGender().select(dataTable.rawTable[1][1])
})

Then('Validate the form behaviour', () =>
{
    //if the output of the name provided is equal to input field value
    homePage.getTwoWayDataBinding().should('have.value', nameInput)

    //if input have minlength attr equal to 2
    homePage.getEditBox().should('have.attr', 'minlength', '2')

    //if the option is disabled
    homePage.getEntrepreneur().should('be.disabled')
})

Then('Select the Shop page', () =>
{
    //shop button click
    homePage.getShopTab().click()
})