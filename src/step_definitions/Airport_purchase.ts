import {Given, When, Then, Before, After} from 'cucumber';
import {BrowserDrv} from '../main/common/BrowserDrv';
import {ShoppingHomePage} from '../main/page_objects/ShoppingHomePage';
import { SpiritsAndWinesPage } from '../main/page_objects/SpiritsAndWinesPage';
import {expect} from 'chai';
import { CartPage } from '../main/page_objects/CartPage';
import { JewelleryPage } from '../main/page_objects/JewelleryPage';
import { CommonUserActions } from '../main/common/CommonUserActions';

let shopHomePage : any = null;
let winesAndSpirits : any = null;
let cartPage : any = null;
let jewelleryPage : any = null;
let selectedJewelleryPrice : string; 

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
    if(shopHomePage == null){
        shopHomePage = await new ShoppingHomePage(BrowserDrv.getDriver());
    }

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
    // if(winesAndSpirits == null){
    //     winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    // }
    // expect(await winesAndSpirits.GetAddCartConfirmationMessage()).to.include(confirmMsg);
    // console.warn(`The message taken: "${await winesAndSpirits.GetAddCartConfirmationMessage()}"`);

    expect(await CommonUserActions.GetConfirmationMessageAfterAddingItemToCart(BrowserDrv.getDriver())).to.include(confirmMsg);

});

Then(/^the user clicks his cart$/, async () => {
    // if(winesAndSpirits == null){
    //     winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    // }

    // winesAndSpirits.NavigateToCart();
    await CommonUserActions.NavigateToCart(BrowserDrv.getDriver());
    
});

Then(/^the item "([^"]*)" should be listed in the cart$/, {timeout: 4 * 5000}, async (itemPur) => {
    if(cartPage == null){
        cartPage = await new CartPage(BrowserDrv.getDriver());
    }
    expect(await cartPage.GetFirstItemInCart()).to.include(itemPur);
    
});

Then(/^the user clicks the Jewellery link$/, async () => {
    if(shopHomePage == null){
        shopHomePage = await new ShoppingHomePage(BrowserDrv.getDriver());
    }

    await shopHomePage.openJewellery();
  });

Then(/^looks for the jewellery "([^"]*)" then selects it$/, {timeout: 4 * 5000}, async (purchaseItem) => {
    if(jewelleryPage == null){
        jewelleryPage = await new JewelleryPage(BrowserDrv.getDriver());
    }
    await jewelleryPage.selectIndicatedItem(purchaseItem);
});

Then(/^the user adds the jewellery to cart then selects "([^"]*)" as pickup from AKL international airport$/, async (pickupOptions) => {
    if(jewelleryPage == null){
        jewelleryPage = await new JewelleryPage(BrowserDrv.getDriver());
    }
    // console.warn(`------------>>> "${await jewelleryPage.getPriceJewel()}"`);
    selectedJewelleryPrice = await jewelleryPage.getPriceJewel();
    await jewelleryPage.AddItemToCartAndSpecPickup(pickupOptions);
});

Then(/^the cart summary should display the correct amount for this purchase$/, async () => {
    
    expect(selectedJewelleryPrice).to.include(await CommonUserActions.GetCartTotalToPay(BrowserDrv.getDriver()));
});
