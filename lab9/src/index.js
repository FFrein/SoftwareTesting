const assert = require('chai').assert;

const {Builder, By, Key, until} = require('selenium-webdriver');

async function EmailAdressTest(){
  let driver = await new Builder().forBrowser('chrome').build();

  let TestResult = true;

  try {
    await driver.get('https://playerok.com/profile/auth');

    await driver.findElement(
        By.name('email'))
        .sendKeys('фывфывю..@outlook.kek', Key.RETURN);

    try{
        let elem = await driver.findElement(
            By.className('FormikForm')            
        );
        if(elem){
            TestResult = false;
        }
    }
    catch{}

  } finally {
    await driver.quit();
    return TestResult;
  }
};


describe('PlayerOk Tests', function(){

    this.timeout(15000); // Установите допустимый таймаут

    it('Using invalid email adress', async () => {
        let result = await EmailAdressTest();
        assert.isTrue(result, 'it is allowed to use the wrong email');
    });

});