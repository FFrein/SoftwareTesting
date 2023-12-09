const { By, until } = require('selenium-webdriver');
const AbstractPage = require('./AbstractPage');

class WalletPage extends AbstractPage {
    constructor(driver) {
        super(driver);
        this.BASE_URL = 'https://playerok.com/wallet/add';
    }

    async openPage() {
        await this.driver.get(this.BASE_URL);

        return this;
    }

    async getPayout(number) {
        await this.driver.findElement(By.xpath("//div//span[contains(text(), 'Выплата')]")).click();
        await this.driver.findElement(By.name('value')).sendKeys(number);
        await this.driver.findElement(By.xpath("//button[contains(text(), 'Создать выплату')]")).click();
        await this.driver.findElement(By.name('account')).sendKeys(number);
        await this.driver.findElement(By.xpath("//button[contains(text(), 'Выплатить')]")).click();
        return this;
    }

    async getErrorMessageBox(){
        return await this.driver.findElement(By.xpath("//div[contains(text(), 'Недостаточно средств к выплате')]")).getText();
    }

    async doDeposite(user) {

    }
}

module.exports = WalletPage;
