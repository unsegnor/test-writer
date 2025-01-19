/**
    In this file we describe the tests in terms of user actions and expectations.
    We could also talk about situations in the the environment that can't be affected by the user like "today is Monday".
**/


const {expect} = require('chai');
const User = require('./test-user.js');
const fs = require('fs');

module.exports = function(real_user_interface, test_user_interface){
    describe('Creating simple tests', function(){
        let realUser, testUser

        this.beforeEach(async function(){
            let user_interface = await real_user_interface()
            realUser = User(user_interface)
            testUser = realUser

            //realUser = User(await real_user_interface())
            //testUser = User(await test_user_interface())
        })

        this.afterEach(async function(){
            await realUser.cleanUp()
            //await testUser.cleanUp() //html-e2e does not support closing twice
        })

        const testCases = ["test1", "test2", "test3"];
        testCases.forEach(testName => {
            it(`add a test and export to JSON for ${testName}`, async () => {
                await realUser.addTest({ name: testName });
                await testUser.AssertTestIsDefined(testName);
            });
        });

        
    })
}
