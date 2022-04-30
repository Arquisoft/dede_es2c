Feature: Login an user on the website

Scenario: The user is registered in the website
  Given An existing user
  When I fill the data in the form
  Then I should see the correct page


Scenario: Incorrect login from a non existing user
  Given A non existing user
  When I fill the data in the form
  Then I should see an error in the page