var request  = require('request');
const netWorkManager =(cb)=>{
    // var status;
    // request('http://localhost:8000', function (error, response, body) {
    //     if (!error) {
    //             return  true;
    //     }else{
    //         return  false;
    //     }
        
    // });
    // return status;


    //second algorithm

    // require('dns').lookup('streamupbox.com',function(err) {
    //     if(err && err.code === "ENOTFOUND"){
    //         cb(false);
    //     }else{
    //         cb(true);
    //     }
    // });

    //this is how to test second algorithm
    // network.check(function(isConnected) {
    //   if(isConnected){
    //     console.log("is connected");
    //   }else{
    //     console.log("is not connected");
    //   }
    // });
}
module.exports ={
    check: netWorkManager
};