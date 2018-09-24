import {WebDriver, By, until, WebElement} from 'selenium-webdriver';
import {LocTypes} from '../utils/LocTypes';

// at the moment, this class is a copy of BasePage
// next modification is BasePage should use this.
export class BasicHelper{

    private static timeOut : number = 10000; // 10ms timeout

    private static getElementByXpath(driver: WebDriver, locator: string) : WebElement{
        var elem = driver.wait(until.elementLocated(By.xpath(locator)), BasicHelper.timeOut);
        return elem;
    }

    private static getElementById(driver: WebDriver, locator: string) : WebElement{
        var elem = driver.wait(until.elementLocated(By.id(locator)), BasicHelper.timeOut);
        return elem;
    }

    private static getElementByCss(driver: WebDriver, locator: string) : WebElement{
        var elem = driver.wait(until.elementLocated(By.css(locator)), BasicHelper.timeOut);
        return elem;
    }

    // this method will return either true/false depending if element is stale.
    private static waitUntilXpathElementIsStale(driver : WebDriver, locator : string) : any{
        var state = driver.wait(until.stalenessOf(driver.findElement(By.xpath(locator))), BasicHelper.timeOut).then((stat) =>{
            return stat;
        });

        return state;
    }

    public static async click(driver : WebDriver, locator: string, loctype: LocTypes, className: string){
        switch(loctype){
            case LocTypes.xpath:
                try{
                    await BasicHelper.getElementByXpath(driver, locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Xpath type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
                break;
            
            case LocTypes.id:
                try{
                    await BasicHelper.getElementById(driver, locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Id type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.css:
                try{
                    await BasicHelper.getElementByCss(driver, locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Css type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
        }
    }

    public static async type(driver: WebDriver, locator: string, loctype: LocTypes, className: string, toType: string){
        switch(loctype){
            case LocTypes.xpath:
                try{
                    await BasicHelper.getElementByXpath(driver, locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Xpath type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.id:
                try{
                    await BasicHelper.getElementById(driver, locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Id type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.css:
                try{
                    await BasicHelper.getElementByCss(driver, locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Css type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
        }
    }
}