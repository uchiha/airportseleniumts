import {BasePage} from '../common/BasePage'
import {WebDriver } from 'selenium-webdriver';
import { LocTypes } from '../utils/LocTypes';
import {Navigator} from '../common/Navigator';

export class ShoppingHomePage extends BasePage{
    
    private driver : WebDriver;
    
    constructor(driver: WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async openWinesAndSpirits(){
       await Navigator.GoToWinesAndSpirits(this.driver, ShoppingHomePage.name);
    }

    public async openJewellery(){
        await Navigator.GoToJewellery(this.driver, ShoppingHomePage.name);
     }
}