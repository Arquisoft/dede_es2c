Feature: Registering a new user to the website

Scenario: The user is registered in the website
  Given A new user
  When I fill the data in the form
  Then I should see the correct page