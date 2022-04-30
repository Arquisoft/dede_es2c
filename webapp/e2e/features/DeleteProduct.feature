Feature: Delete product

Scenario: The user deletes a product
    Given An existing user
    When I log in and want to delete the product I add
    Then It should not be in the cart anymore