import {WebDriver, By, until, WebElement} from 'selenium-webdriver';
import {LocTypes} from '../utils/LocTypes';

export class BasePage{
    private _driver : WebDriver;
    private timeOut : number = 10000; // 10ms timeout

    constructor(driver: WebDriver){
        this._driver = driver
    }

    protected getElementByXpath(locator: string) : WebElement{
        var elem = this._driver.wait(until.elementLocated(By.xpath(locator)), this.timeOut);
        return elem;
    }

    protected getElementById(locator: string) : WebElement{
        var elem = this._driver.wait(until.elementLocated(By.id(locator)), this.timeOut);
        return elem;
    }

    protected getElementByCss(locator: string) : WebElement{
        var elem = this._driver.wait(until.elementLocated(By.css(locator)), this.timeOut);
        return elem;
    }

    

    
    // this method will return either true/false depending if element is stale.
    protected waitUntilXpathElementIsStale(locator : string) : any{
        var state = this._driver.wait(until.stalenessOf(this._driver.findElement(By.xpath(locator))), this.timeOut).then((stat) =>{
            return stat;
        });

        return state;
    }

    protected async click(locator: string, loctype: LocTypes, className: string){
        switch(loctype){
            case LocTypes.xpath:
                try{
                    await this.getElementByXpath(locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Xpath type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
                break;
            
            case LocTypes.id:
                try{
                    await this.getElementById(locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Id type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.css:
                try{
                    await this.getElementByCss(locator).click();
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Css type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
        }
    }

    protected async type(locator: string, loctype: LocTypes, className: string, toType: string){
        switch(loctype){
            case LocTypes.xpath:
                try{
                    await this.getElementByXpath(locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Xpath type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.id:
                try{
                    await this.getElementById(locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Id type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }

            case LocTypes.css:
                try{
                    await this.getElementByCss(locator).sendKeys(toType);
                } catch(error){
                    console.error(`[Error from PageObj -> "${className}"] Element of Css type: "${locator}" is not visible.`);
                    throw new Error(`->> An error occured from PageObject: "${className}" - "${error}`);
                }
        }
    }
}