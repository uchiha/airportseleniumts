import {BasePage} from '../common/BasePage';
import {WebDriver} from 'selenium-webdriver';

export class CartPage extends BasePage{

    private driver: WebDriver;
    private firstItemLoc : string = "div[class='cartItemProductTitle cartItemProductTitleEditable'] a";

    constructor(driver: WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async GetFirstItemInCart() : Promise<string>{
        var itemGot : string;
        itemGot = await this.getElementByCss(this.firstItemLoc).getText().then( (theText) => {
            return theText;
        })
        return itemGot;
    }
}