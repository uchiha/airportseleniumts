Feature: Sample purchases from the airport shopping app

    Background: Open the airport shopping app url
        Given a user browses "https://flamingo.preprod.akl.om3.cloud/en"

    Scenario: a user purchases a particular wine/spirit
        Given the user clicks the wine and spirit link
        And looks for the item "Glenfiddich Select Cask 1L"