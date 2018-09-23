import {BasePage} from '../common/BasePage'
import {WebDriver } from 'selenium-webdriver';
import { LocTypes } from '../utils/LocTypes';

export class ShoppingHomePage extends BasePage{
    
    private driver : WebDriver;
    private winesAndSpiritsLoc : string = "//div[@class='navigationItem']/a[contains(.,'Spirits & Wine')]";
    private viewAllWinesAndSpiritsLoc : string = "//div[@class='navigationDropdownInner']/a[contains(.,'View all Spirits & Wine')]";

    constructor(driver: WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async openWinesAndSpirits(){
        await this.click(this.winesAndSpiritsLoc, LocTypes.xpath, ShoppingHomePage.name);
        await this.click(this.viewAllWinesAndSpiritsLoc, LocTypes.xpath, ShoppingHomePage.name);
    }
}