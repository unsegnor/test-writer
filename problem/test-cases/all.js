module.exports = function(real_user_interface, test_user_interface){
    describe('All tests', function(){
        require('./adding-tests.js')(real_user_interface, test_user_interface)
    })
}
