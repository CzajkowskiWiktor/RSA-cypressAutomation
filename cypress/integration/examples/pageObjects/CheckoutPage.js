class CheckoutPage
{
    getCheckoutBtn()
    {
        return cy.contains('Checkout')
    }

    getContinueShopBtn()
    {
        return cy.contains('Continue Shopping')
    }

    getAmountOfProduct()
    {
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalAmount()
    {
        return cy.get('h3 strong')
    }
}

export default CheckoutPage;