Feature: Add new products

Scenario: The user adds new products to the car
    Given An existing user
    When I log in and press the button to add my products
    Then They should be in the cart