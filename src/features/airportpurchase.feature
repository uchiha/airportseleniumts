Feature: Sample purchases from the airport shopping app

    Background: Open the airport shopping app url
        Given a user browses "https://flamingo.preprod.akl.om3.cloud/en"

    Scenario: a user purchases a particular wine/spirit
        Given the user clicks the wine and spirit link
        And looks for the item "Mount Gay Eclipse 1L" then selects it
        When the user adds it to cart then selects "departure" as pickup from AKL international airport
        Then the message "You’ve added this item to your cart for pick up departing from AKL International Airport" is displayed
        When the user clicks his cart
        Then the item "Mount Gay Eclipse 1L" should be listed in the cart