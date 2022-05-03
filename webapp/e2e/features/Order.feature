Feature: Experiment with the orders

Scenario: The user makes an incorrect order
    Given An existing user
    When I choose a product and dont fill the order form
    Then An error should appear