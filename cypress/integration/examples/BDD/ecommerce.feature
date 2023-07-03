Feature: End to End Ecommerce validation

    Application Regression from Udemy Course RSA
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to cart
    And Validate the total price of added products
    Then Select the country, submit and verify success message

    @Smoke
    Scenario: FIlling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    |name | gender |
    |Bob | Female |
    Then Validate the form behaviour
    And Select the Shop page