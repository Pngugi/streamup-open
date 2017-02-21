let os = require('os');
let fs = require('fs');
export class Mkdir{
    private dir:string;
    
    constructor(dir:string){
        this.dir = dir;
    }
    
    public create():boolean{
        console.log("we are being called");
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
