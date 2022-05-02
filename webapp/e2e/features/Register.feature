Feature: Register ann existing user

Scenario: The user is already registered on the website
  Given Data from an existing user
  When I fill the data in the form
  Then I should see the error


Scenario: I dont fill all the data in the form
  Given Nothing
  When I dont fill the data in the form
  Then I should see the error
