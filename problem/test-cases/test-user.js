/**
    This is the user that performs the test.
    It receives a user interface which is the one it will use for testing.
    It doesn't know what interface it is using, that specificities will go in the user interface.
    It is aware of:
        the operations that are needed to be performed on the interface
        the time it takes to get the results
        the errors generated
        all the information that is only known by the user that could be relevant for the testing, like (credentials, name, age ... )
        
    We can add specific user expectations here regarding the error messages or the time it takes to get the results
**/

module.exports = function(user_interface){
    return Object.freeze({
        addTest,
        getTest,
        exportTests,
        cleanUp,
        loadExport,
        AssertTestIsDefined
    })

    async function addTest(test){
        return await user_interface.addTest(test)
    }

    async function cleanUp(){
        await user_interface.close()
    }

    async function getTest(id){
        return await user_interface.getTest(id)
    }

    async function loadExport(){
        return await user_interface.loadExport()
        //return await user_interface.getTestsFromJson()
    }

    async function AssertTestIsDefined(name){
        let tests_json = await loadExport();
        let tests = JSON.parse(tests_json);
        console.log(tests)
        if (!tests) {
            throw new Error("Tests have not been loaded.");
        }
        const test = tests.find(test => test.name === name);
        if (!test) {
            throw new Error(`Test with name "${name}" is not defined.`);
        }
    }

    async function exportTests(){
        await user_interface.exportTests()
    }
}
