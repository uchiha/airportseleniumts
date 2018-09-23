import {BasePage} from '../common/BasePage';
import {WebDriver, until, By, WebElement} from 'selenium-webdriver';

export class SpiritsAndWinesPage extends BasePage{
    
    private driver : WebDriver;
    private liqTimeout : number = 12000;
    private SpiritAndWinesOptions : string = "//div[@class='productGrid  searchProductGrid']/a";

    constructor(driver: WebDriver){
        super(driver);
        this.driver = driver;
    }

    public async printAllLiquorsLabels(){
        let gg : WebElement[] = new Array();
        await this.driver.wait(until.elementsLocated(By.xpath(this.SpiritAndWinesOptions)), this.liqTimeout).then( (els) => {
            
            for (var i = 0; i < els.length; i++){
                
                // els[i].getAttribute("title").then(function(title){
                    
                //     // gg.push(title);
                //     console.warn(`"${title}"`);                    
                // });
                gg.push(els[i]);
                
            }
            // console.warn(`The first element is: "${gg[0]}"`);
            // console.warn(`The array has: "${gg.length}" number of elements`);
            
        });
        console.warn(`the number of liquors is: "${gg.length}"`);
        gg[0].getAttribute("title").then((eles) => {
            console.warn(`The first element is: "${eles}"`);
        });
    }

    public async getAllProductsAlc(){
        // return await this.printAllLiquorsLabels().then((arr) => {
        //     console.warn(`The first element is: "${arr[0]}"`);
        //     console.warn(`The array has: "${arr.length}" elements`);
        // });
        
    }
}