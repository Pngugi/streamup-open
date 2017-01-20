// var fs = require('fs');

// function mkdir(dir) {
//         var os = require('os'),
       
//          newDir =os.homedir() +'/'+dir;
//         fs.exists(newDir,function (params,status) {
//         if(status !== true){
//             fs.mkdir(newDir,function(_,t){});
//             fs.chmod(newDir, '777',function(_,t){
                    
//                 });
                
//             }else{
//                 fs.chmod(newDir, '777',function(_,t){


//                 });
//             }
            
//         });
//     return true;    
// }
// module.exports = {
//     mkdir: mkdir
// };
let os = require('os');
let fs = require('fs');
export class Mkdir{
    private dir:string;
    private isHosted:boolean;
    private applyGit:boolean;
    constructor(dir:string){
        this.dir = dir;
    }
    public create(){
        let newDir = os.homedir() + '/' + this.dir;
        fs.exists(newDir,function (params,status) {
        if(status !== true){
            fs.mkdir(newDir,function(_,t){});
            fs.chmod(newDir, '777',function(_,t){
                    
                });
                
            }else{
                fs.chmod(newDir, '777',function(_,t){


                });
            }
            
        });
        return true;    
    }
}
