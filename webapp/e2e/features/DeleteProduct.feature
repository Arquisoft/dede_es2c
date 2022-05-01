Feature: Delete product

Scenario: The user deletes a product
    Given An existing user
    When I log in and want to delete the product I add
    Then I should be able to delete the product