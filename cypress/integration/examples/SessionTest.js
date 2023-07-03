/// <reference types="cypress" />
const excelToJson = require('convert-excel-to-json')
const neatCSV = require('neat-csv')


describe('JWT Session', () => 
{
    it("Is user logged in through local storage", () =>
    {
        cy.LoginApi().then(() => 
        {
            cy.visit("https://rahulshettyacademy.com/client", 
            {
                onBeforeLoad : function(window)
                {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })

        var cardProductname
        cy.get(".card-body b").eq(2).then((el) =>
        {
            cardProductname = el.text();
        })
        cy.get(".card-body button:last-of-type").eq(2).click()
        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("[placeholder*='Country']").type('pol')
        cy.get(".ta-results button").each(($el, index, $list) => 
        {
            cy.log($el.text())
            const actualCountryText = $el.text();
            if(actualCountryText.trim() === "Poland")
            {
                cy.wrap($el).click()
            }
            else
            {
                cy.log("Not found country")
            }
        })

        cy.get('.action__submit').click()
        cy.wait(2000)
        var orderID
        cy.get('tr label.ng-star-inserted').then((el) => 
        {
            var wholeOrderID = el.text()
            var orderArr = wholeOrderID.split(" ")
            // console.log(orderID[2].trim())
            orderID = orderArr[2].trim()
            cy.log(orderID)
        })
        
        //validating with CSV file - !this method contains only work with buttons!
        cy.get('.order-summary button').contains("CSV").click();

        cy.wait(2000);
        cy.readFile(Cypress.config("fileServerFolder")+"\\cypress\\downloads\\order-invoice_test!1234.csv")
        .then(async (text) => 
        {
            const csv = await neatCSV(text)
            const actualProductNameCSV  = csv[0]["Product Name"]
            const actualOrderIDCSV  = csv[0]["Invoice Number"]
            expect(cardProductname).to.equal(actualProductNameCSV)
            expect(orderID).to.equal(actualOrderIDCSV)
        });

        //validating with Excel file - with TASK cypress
        cy.get('.order-summary button').contains("Excel").click();
        cy.wait(2000);
        const filePath = Cypress.config("fileServerFolder")+"\\cypress\\downloads\\order-invoice_test!1234.xlsx";
        cy.task('excelToJsonCoverter', filePath).then((result) =>
        {
            // cy.log(result.data[0].A);
            expect(cardProductname).to.equal(result.data[1].B);
            expect(orderID).to.equal(result.data[1].A);
        });

        //check if the values are present in the text downloaded without  from Excel (or CSV)
        cy.readFile(filePath).then((text) =>
        {
            expect(text).to.include(cardProductname);
            expect(text).to.include(orderID);
        });


    });
});