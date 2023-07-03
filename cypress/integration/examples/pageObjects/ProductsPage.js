class ProductsPage
{
    getCheckoutButton()
    {
        return cy.get('a.nav-link.btn')
    }
}

export default ProductsPage;