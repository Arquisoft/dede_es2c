Feature: Make an order without filling the forms

Scenario: The user makes an incorrect order
    Given An existing user
    When I choose a product and dont fill the order form
    Then An error should appear