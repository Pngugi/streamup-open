import { Storage } from './storage';
export class Reaction{
    saveOnDisk(obj:Object,filePath?:string,buffer?:Buffer):boolean{
        
        new Storage().setItem(obj,filePath,buffer)
        return true;
    }
}