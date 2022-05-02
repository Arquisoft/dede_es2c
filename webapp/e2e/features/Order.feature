Feature: Experiment with the orders

Scenario: The user makes an incorrect order
    Given An existing user
    When I choose a product and dont fill the order form
    Then An error should appear

Scenario: The user can see the history of orders
    Given An existing user
    When I log in and want to check the orders
    Then I can see the orders made in the website