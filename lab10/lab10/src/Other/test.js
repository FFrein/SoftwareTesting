const homepage = require('../PageObjects/HomePage');

describe('Describe', function(){
    this.timeout(50000);
   
    beforeEach(function(){
     
    });

    it('POM Test Check', async function(){
        var baseurl = 'https://playerok.com/';
        await homepage.enter_url(baseurl);
        await homepage.enter_search('Browserstack selenium javascript pom');
    })

    afterEach(async function(){
        await homepage.closeBrowser();
    });

})