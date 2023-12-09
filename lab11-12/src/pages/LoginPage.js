const { By } = require('selenium-webdriver');
const AbstractPage = require('./AbstractPage');
const MainPage = require('./MainPage');
const RamblerReader = require('../util/Rabmler');
const ProfilePage = require('./ProfilePage');

class LoginPage extends AbstractPage {
    constructor(driver) {
        super(driver);
        this.PAGE_URL = 'https://playerok.com/profile/auth';
    }

    async openPage() {
        await this.driver.get(this.PAGE_URL);
        console.log('Login page opened');
        return this;
    }

    async login(user) {
        console.log('login: ',user.username, 'pass: ',user.password)
        await this.driver.findElement(By.name('email')).sendKeys(user.username);
        await this.driver.findElement(By.xpath("//button[contains(text(), 'Получить код')]")).click();
        await this.driver.sleep(7000); // Задержка в 7 секунду

        const reader = new RamblerReader();
        await reader.fetchEmails();
        let code = await reader.printConfirmationCode();

        await this.driver.findElement(By.css('input[type="number"]')).sendKeys(code);
        
        await this.driver.sleep(3000); // Задержка в 3 секунду

        console.log('Login performed');
        return new ProfilePage(this.driver);
    }
}

module.exports = LoginPage;
