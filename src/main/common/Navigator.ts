import {WebDriver} from 'selenium-webdriver';
import {BasicHelper} from './BasicHelper';
import { LocTypes } from '../utils/LocTypes';

export class Navigator{
    private static ShopCartLoc: string = "a[class='navigationIconButton navigationIconButtonCart cartButton']";

    public static GoToCart(driver : WebDriver, className: string){
        BasicHelper.click(driver, this.ShopCartLoc, LocTypes.css, className);
    }
}