import {WebDriver} from 'selenium-webdriver';
import {BasicHelper} from '../common/BasicHelper';
import { LocTypes } from '../utils/LocTypes';
import { Navigator} from '../common/Navigator';

export class CommonUserActions {
    private static AddToCart : string = "(//button[contains(.,'Add to Cart')])[1]";
    private static PickupDeparture : string = "(//a[contains(.,'at Departure')])[1]";
    private static PickupArrival : string = "(//a[contains(.,'on Arrival')])[1]";

    private static AddCartMessageLoc : string = "(//div[@class='productAddToCartStep productAddToCartStep3'])[1]";
    private static CartTotalToPay : string ="(//div[@class='cartSummaryRowValue'])[1]";

    public static async AddSelectedItemToCart(driver : WebDriver, className : string, option : string){
        await BasicHelper.click(driver, this.AddToCart, LocTypes.xpath, className);
        if(option == "departure"){
            await BasicHelper.click(driver, this.PickupDeparture, LocTypes.xpath, className);
        } else {
            await BasicHelper.click(driver, this.PickupArrival, LocTypes.xpath, className);
        }
    }

    public static async GetConfirmationMessageAfterAddingItemToCart(driver : WebDriver){
        var msgGot : string;
        msgGot = await BasicHelper.getElementByXpath(driver, this.AddCartMessageLoc).getText().then( (theText) => {
            return theText;
        })
        return msgGot;
    }

    public static async NavigateToCart(driver : WebDriver){
       await Navigator.GoToCart(driver, CommonUserActions.name);
    }

    public static async GetCartTotalToPay(driver : WebDriver){
        var totalToPay : string;
        totalToPay = await BasicHelper.getElementByXpath(driver, this.CartTotalToPay).getText().then( (theText) => {
            return theText;
        })
        return totalToPay;
    }
}