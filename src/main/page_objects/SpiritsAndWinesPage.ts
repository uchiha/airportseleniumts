import {BasePage} from '../common/BasePage';
import {WebDriver, until, By, WebElement} from 'selenium-webdriver';
import { LocTypes } from '../utils/LocTypes';
import { Navigator } from '../common/Navigator';

export class SpiritsAndWinesPage extends BasePage{
    
    private driver : WebDriver;
    private liqTimeout : number = 12000;
    private SpiritAndWinesOptions : string = "//div[@class='productGrid  searchProductGrid']/a";
    private NextPage : string = "(//a[contains(.,'Next Page')])[1]";
    private AddToCart : string = "(//button[contains(.,'Add to Cart')])[1]";
    private PickupDeparture : string = "(//a[contains(.,'at Departure')])[1]";
    private PickupArrival : string = "(//a[contains(.,'on Arrival')])[1]";
    private AddCartMessageLoc : string = "(//div[@class='productAddToCartStep productAddToCartStep3'])[1]";

    private SpecificLiquor(name: string) : string{
        return `//div[@class='productGrid  searchProductGrid']/a[contains(.,'${name}')]`;
    }

    constructor(driver: WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async getAllLiquorOnPage() : Promise<WebElement[]>{
        let liqElems : WebElement[] = new Array();
        await this.driver.wait(until.elementsLocated(By.xpath(this.SpiritAndWinesOptions)), this.liqTimeout).then( async (els) => {
            
            for (var i = 0; i < els.length; i++){
                await liqElems.push(els[i]); 
            }
            
        });
        return liqElems;
    }

    public async getAllProductsAlc(theAlc: string) : Promise<boolean>{
        let alcFound : boolean = false;
        await this.getAllLiquorOnPage().then(async (ele) => {
            for(var i = 0; i < ele.length; i++){
                await ele[i].getAttribute("title").then( (theTitle) => {
                    // await console.warn(`"${theTitle}"`);
                    if(theTitle == theAlc){
                        alcFound = true;
                        // console.warn(`--> "${alcFound}"`);
                    }
                });
            }
        });
        
        return alcFound;
    }

    public async selectIndicatedItem(item: string){
        
        // click on "Next Page" link while the liquor is not found
        while(await this.getAllProductsAlc(item).then( (isFound) => {
            return isFound;
        }) == false){
            await this.click(this.NextPage, LocTypes.xpath, SpiritsAndWinesPage.name);
        }

        // when it is finally found:
        await this.click(this.SpecificLiquor(item), LocTypes.xpath, SpiritsAndWinesPage.name);
    }

    public async AddItemToCartAndSpecPickup(option: string){
        await this.click(this.AddToCart, LocTypes.xpath, SpiritsAndWinesPage.name);
        await this.click(this.PickupDeparture, LocTypes.xpath, SpiritsAndWinesPage.name);
    }

    public async GetAddCartConfirmationMessage() : Promise<string>{
        var msgGot : string;
        msgGot = await this.getElementByXpath(this.AddCartMessageLoc).getText().then( (theText) => {
            return theText;
        })
        return msgGot;
    }

    public async NavigateToCart(){
        await Navigator.GoToCart(this.driver, SpiritsAndWinesPage.name);
    }
}