import * as webdriver from 'selenium-webdriver';

export class BrowserDrv{
    private static driver : webdriver.WebDriver;

    public static setDriver(){
        BrowserDrv.driver = new webdriver.Builder()
                            // .usingServer('http://localhost:4444/wd/hub')
                            .withCapabilities(webdriver.Capabilities.chrome())
                            .build();
    }

    public static getDriver(){
        return BrowserDrv.driver;
    }
}