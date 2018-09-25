Feature: Sample purchases from the airport shopping app

    Background: Open the airport shopping app url
        Given a user browses "https://flamingo.preprod.akl.om3.cloud/en"

    Scenario: a user purchases a particular wine/spirit
        Given the user clicks the wine and spirit link
        And looks for the item "ROYAL SALUTE SAPPHIRE 700ml" then selects it
        When the user adds it to cart then selects "departure" as pickup from AKL international airport
        Then the message "You’ve added this item to your cart for pick up departing from AKL International Airport" is displayed
        When the user clicks his cart
        Then the item "ROYAL SALUTE SAPPHIRE 700ml" should be listed in the cart

    Scenario: a user purchases a particular Jewellery
        Given the user clicks the Jewellery link
        And looks for the jewellery "9ct Yellow Gold Mini Bow Earrings" then selects it
        When the user adds the jewellery to cart then selects "departure" as pickup from AKL international airport
        Then the message "You’ve added this item to your cart for pick up departing from AKL International Airport" is displayed
        When the user clicks his cart
        Then the item "9ct Yellow Gold Mini Bow Earrings" should be listed in the cart
        And the cart summary should display the correct amount for this purchase