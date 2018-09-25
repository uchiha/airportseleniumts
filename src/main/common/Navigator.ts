import {WebDriver} from 'selenium-webdriver';
import {BasicHelper} from './BasicHelper';
import { LocTypes } from '../utils/LocTypes';

export class Navigator{
    // Shopping cart button
    private static ShopCartLoc: string = "a[class='navigationIconButton navigationIconButtonCart cartButton']";

    //Wines and Spirits
    private static WinesAndSpiritsLoc : string = "//div[@class='navigationItem']/a[contains(.,'Spirits & Wine')]";
    private static ViewAllWinesAndSpiritsLoc : string = "//div[@class='navigationDropdownInner']/a[contains(.,'View all Spirits & Wine')]";

    //Jewellery
    private static JewelleryLoc : string = "//div[@class='navigationItem']/a[contains(.,'Jewellery')]";
    private static ViewAllJewelleryLoc : string = "//div[@class='navigationDropdownInner']/a[contains(.,'View all Jewellery')]";

    public static GoToCart(driver : WebDriver, className: string){
        BasicHelper.click(driver, this.ShopCartLoc, LocTypes.css, className);
    }

    public static GoToWinesAndSpirits(driver: WebDriver, className: string){
        BasicHelper.click(driver, this.WinesAndSpiritsLoc, LocTypes.xpath, className);
        BasicHelper.click(driver, this.ViewAllWinesAndSpiritsLoc, LocTypes.xpath, className);
    }

    public static GoToJewellery(driver: WebDriver, className: string){
        BasicHelper.click(driver, this.JewelleryLoc, LocTypes.xpath, className);
        BasicHelper.click(driver, this.ViewAllJewelleryLoc, LocTypes.xpath, className);
    }

    
}