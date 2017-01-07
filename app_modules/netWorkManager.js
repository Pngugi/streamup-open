var request  = require('request');
const netWorkManager =()=>{
    request('https://streamupbox.com', function (error, response, body) {
        if (!error && response.statusCode === 200) {
               return true;
        }else{
            return false;
        }
        
    });
}
module.exports ={
    check: netWorkManager
};