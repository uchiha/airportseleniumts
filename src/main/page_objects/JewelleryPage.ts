import {BasePage} from '../common/BasePage';
import { WebDriver, WebElement, until, By } from 'selenium-webdriver';
import {LocTypes} from '../utils/LocTypes';
import { CommonUserActions } from '../common/CommonUserActions';

export class JewelleryPage extends BasePage{

    private driver : WebDriver;
    private jelTimeout : number = 12000;
    private JewelleryOptions : string = "//div[@class='productGrid  searchProductGrid']/a";
    private NextPage : string = "(//a[contains(.,'Next Page')])[1]";
    private JewelPrice : string = "(//div[@class='priceRegular']/strong)[2]";
    private SpecificJewellery(name: string) : string{
        return `//div[@class='productGrid  searchProductGrid']/a[contains(.,'${name}')]`;
    }

    constructor(driver : WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async getAllJewelleryOnPage() : Promise<WebElement[]>{
        let jelElems : WebElement[] = new Array();
        await this.driver.wait(until.elementsLocated(By.xpath(this.JewelleryOptions)), this.jelTimeout).then( async (els) => {
            
            for (var i = 0; i < els.length; i++){
                await jelElems.push(els[i]); 
            }
            
        });
        return jelElems;
    }

    public async getAllProductsJewellery(theJewel: string) : Promise<boolean>{
        let jewelFound : boolean = false;
        await this.getAllJewelleryOnPage().then(async (ele) => {
            for(var i = 0; i < ele.length; i++){
                await ele[i].getAttribute("title").then( (theTitle) => {
                    // await console.warn(`"${theTitle}"`);
                    if(theTitle == theJewel){
                        jewelFound = true;
                        // console.warn(`--> "${alcFound}"`);
                    }
                });
            }
        });
        
        return jewelFound;
    }

    public async selectIndicatedItem(item: string){
        
        // click on "Next Page" link while the liquor is not found
        while(await this.getAllProductsJewellery(item).then( (isFound) => {
            return isFound;
        }) == false){
            await this.click(this.NextPage, LocTypes.xpath, JewelleryPage.name);
        }

        // when it is finally found:
        await this.click(this.SpecificJewellery(item), LocTypes.xpath, JewelleryPage.name);
    }

    public async getPriceJewel(){
        return await this.getElementByXpath(this.JewelPrice).getText();
    }

    public async AddItemToCartAndSpecPickup(option: string){
        await CommonUserActions.AddSelectedItemToCart(this.driver, JewelleryPage.name, option);
    }
}