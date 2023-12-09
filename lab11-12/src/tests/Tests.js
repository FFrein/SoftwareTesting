const assert = require('assert');
const LoginPage = require('../pages/LoginPage');
const UserCreator = require('../service/UserCreator');
const DriverSingleton = require('../driver/DriverSingleton');
const Page404 = require('../pages/404Page');
const Logger = require('../util/Logger');
const ProfilePage = require('../pages/ProfilePage');
const WalletPage = require('../pages/WalletPage');
let driver;

describe('TestsForAuthorizedUser', function() {
    this.timeout(90000);

    before(async function() {
        driver = await DriverSingleton.getInstance("chrome");//MicrosoftEdge
    });
    after(async function() {
        await DriverSingleton.closeDriver();
    });
    afterEach(async function() {
        // Проверяем, прошел ли тест
        if (this.currentTest.state === 'failed') {
            Logger.TakeScreenshot(driver);
            await DriverSingleton.closeDriver();
        }
    });

    it('oneCanLoginGithub', async function() {
        const testUser = await UserCreator.withCredentialsFromProperty();
        let loggedInUserName = new LoginPage(driver);
        loggedInUserName = await loggedInUserName.openPage();
        loggedInUserName = await loggedInUserName.login(testUser);
        loggedInUserName = await loggedInUserName.getLoggedInUserName(testUser);
        assert.strictEqual(loggedInUserName, testUser.username);
    });

    it('Withdrawal without funds', async function() {
        let Result = new WalletPage(driver);
        Result = await Result.openPage();
        Result = await Result.getPayout('1000');
        Result = await Result.getErrorMessageBox();
        assert.strictEqual(Result, 'Недостаточно средств к выплате');
    });

});

describe('TestsForUnauthorizedUser', function() {
    this.timeout(90000);

    before(async function() {
        driver = await DriverSingleton.getInstance("chrome");
    });
    after(async function() {
        await DriverSingleton.closeDriver();
    });
    afterEach(async function() {
        // Проверяем, прошел ли тест
        if (this.currentTest.state === 'failed') {
            Logger.TakeScreenshot(driver);
            await DriverSingleton.closeDriver();
        }
    });
    
    it('Error404', async function() {
        let ErrorPage = new Page404(driver);
        ErrorPage = await ErrorPage.openPage();
        ErrorPage = await ErrorPage.GetError404();
        assert.strictEqual(ErrorPage, 'Страница не найдена');
    });
});
