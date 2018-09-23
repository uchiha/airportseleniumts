import {Given, When, Then, Before, After} from 'cucumber';
import {BrowserDrv} from '../main/common/BrowserDrv';
import {ShoppingHomePage} from '../main/page_objects/ShoppingHomePage';
import { SpiritsAndWinesPage } from '../main/page_objects/SpiritsAndWinesPage';

let shopHomePage = null;
let winesAndSpirits = null;

Before( async () => {
    console.warn(">> Trigger before");
    await BrowserDrv.setDriver();
    await BrowserDrv.getDriver().manage().window().maximize();
});

// After( async () => {
//     console.warn(">> Trigger after");
//     await BrowserDrv.getDriver().quit();
// });

When(/^a user browses "([^"]*)"$/, {timeout: 3 * 5000}, async (url) => {
    console.warn(">> Trigger URL opening..");
    await BrowserDrv.getDriver().get(url);
});
  
Then(/^the user clicks the wine and spirit link$/, async () => {
    console.warn(">> Click wines and spirits..");
    shopHomePage = await new ShoppingHomePage(BrowserDrv.getDriver());
    await shopHomePage.openWinesAndSpirits();
});
  
Then(/^looks for the item "([^"]*)"$/, async (purchaseItem) => {
    winesAndSpirits = await new SpiritsAndWinesPage(BrowserDrv.getDriver());
    
    await winesAndSpirits.printAllLiquorsLabels();
});