//require('dotenv').config();
const {TestUser} = require("html-e2e")
const HtmlSolution = require('./htmlLocalSolution.js')

module.exports = async function(){
    async function runHtmlSolution(){
        return await HtmlSolution()
    }

    const solution = await runHtmlSolution()
    const testUser = await TestUser({showBrowser: true})

    await testUser.open(solution.url)
    //await testUser.set('credentials', process.env.OPENAI_API_KEY)


    return Object.freeze({
        addTest,
        runTests,
        getTest,
        exportTests,
        loadExport,
        close
    })

    async function addTest(test){
        await testUser.set("name", test.name)
        await testUser.doAction("add test")
    }

    async function runTests(){
        await testUser.doAction('run all')
        let result = await testUser.get('result')
        return {passed: result == 'passed'}
    }

    async function close(){
        await testUser.close()
        await solution.close()
    }

    async function loadExport(){
        //await testUser.doAction('load export'); //we can0't do this until html-e2e has support for downloading and uploading files
        await testUser.doAction('load')
        return await testUser.get('JSON')
    }

    async function getTest(id){
        let question = await testUser.get(`test${id} question`)
        let responseEvaluation = await testUser.get(`test${id} response evaluation`)
        let result = await testUser.get(`test${id} result`)
        return {question, responseEvaluation, passed: result == 'passed'}
    }

    async function exportTests(){
        //await testUser.doAction('export tests') //we will do this when html-e2e has support for downloading and uploading files
        //for the moment we will get the tests running an existing method in the javascript of the html (this also needs support from html-e2e)

        //then for the moment we will call to a different button that stores the same information in the local storage
        await testUser.doAction('save')
    }
}
