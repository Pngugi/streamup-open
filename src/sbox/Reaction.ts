import { Storage } from './storage';
export class Reaction{
    saveOnDisk(obj:Object,filePath?:string,buffer?:Buffer):boolean{
        //TODO understand the meaning of buffer...and usability here
        new Storage().setItem(obj,filePath,buffer)
        return true;
    }
}