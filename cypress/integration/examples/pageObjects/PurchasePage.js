class PurchasePage
{
    getDeliveryCountry()
    {
        return cy.get('#country')
    }

    getClickCountryFromList()
    {
        return cy.get('.suggestions > ul > li > a')
    }

    getCheckbox()
    {
        return cy.get('#checkbox2')
    }

    getPutchaseBtn()
    {
        return cy.get('input[type="submit"]')
    }

    getAlertMsg()
    {
        return cy.get('.alert')
    }
}

export default PurchasePage;
