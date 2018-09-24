import {Given, When, Then, Before, After} from 'cucumber';
import {BrowserDrv} from '../main/common/BrowserDrv';
import {ShoppingHomePage} from '../main/page_objects/ShoppingHomePage';
import { SpiritsAndWinesPage } from '../main/page_objects/SpiritsAndWinesPage';
import {expect} from 'chai';
import { CartPage } from '../main/page_objects/CartPage';

let shopHomePage : any = null;
let winesAndSpirits : any = null;
let cartPage : any = null;

Before( async () => {
    console.warn(">> Trigger before");
    await BrowserDrv.setDriver();
    await BrowserDrv.getDriver().manage().window().maximize();
});

After( async () => {
    console.warn(">> Trigger after");
    await BrowserDrv.getDriver().quit();
});

When(/^a user browses "([^"]*)"$/, {timeout: 3 * 5000}, async (url) => {
    console.warn(">> Trigger URL opening..");
    await BrowserDrv.getDriver().get(url);
});
  
Then(/^the user clicks the wine and spirit link$/, async () => {
    console.warn(">> Click wines and spirits..");
    shopHomePage = await new ShoppingHomePage(BrowserDrv.getDriver());
    await shopHomePage.openWinesAndSpirits();
});
  
Then(/^looks for the item "([^"]*)" then selects it$/, {timeout: 4 * 5000}, async (purchaseItem) => {
    winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    await winesAndSpirits.selectIndicatedItem(purchaseItem);
});

Then(/^the user adds it to cart then selects "([^"]*)" as pickup from AKL international airport$/, async (pickupOptions) => {
    if(winesAndSpirits == null){
        winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    }
    await winesAndSpirits.AddItemToCartAndSpecPickup(pickupOptions);
});

Then(/^the message "([^"]*)" is displayed$/, {timeout: 4 * 5000}, async (confirmMsg) =>  {
    if(winesAndSpirits == null){
        winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    }
    expect(await winesAndSpirits.GetAddCartConfirmationMessage()).to.include(confirmMsg);
    // console.warn(`The message taken: "${await winesAndSpirits.GetAddCartConfirmationMessage()}"`);
});

Then(/^the user clicks his cart$/, async () => {
    if(winesAndSpirits == null){
        winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    }

    winesAndSpirits.NavigateToCart();
    
});

Then(/^the item "([^"]*)" should be listed in the cart$/, {timeout: 4 * 5000}, async (itemPur) => {
    if(cartPage == null){
        cartPage = await new CartPage(BrowserDrv.getDriver());
    }
    expect(await cartPage.GetFirstItemInCart()).to.include(itemPur);
    
});
