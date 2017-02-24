import { Storage } from './storage';
import  os = require ('os');
import request = require('request');
import fs = require('fs');
import { Config } from "./config";
export class Api extends Config {

    private osPath: any;
    private URL: string;
    private httpResponse: Object;

    constructor(osPath?: any, URL: string = process.env.URL) {
        super();
        this.osPath = os.homedir() + '/Sbox';
    }

    public post(filePath: string, callback?: any) {

        var formData = {
            authorized_app: 'true',
            folderId: 'undefined',
            file: fs.createReadStream(filePath),

        };
        try {
            request.post({ url: this.uploadApi(), formData: formData }, function (err, response, body) {
                    this.httpResponse = response.body;
                if (typeof (callback) === "function")
                    return callback({
                        response: this.httpResponse
                    });
                //get your personal access token at https://streamupbox.com/developers
            }).auth(null, null, true, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3N2FjOGEzZGIxMGQyN2EwZmM2YjhhYzYyNGY4NWFiOTJiMTBkYzY5NTMxYjY5N2FlM2I0YWIwNjQxODQ3MmVkZTUxOTJhMWEwYzc5NjU0In0.eyJhdWQiOiI1IiwianRpIjoiYjc3YWM4YTNkYjEwZDI3YTBmYzZiOGFjNjI0Zjg1YWI5MmIxMGRjNjk1MzFiNjk3YWUzYjRhYjA2NDE4NDcyZWRlNTE5MmExYTBjNzk2NTQiLCJpYXQiOjE0ODc4ODA4MzMsIm5iZiI6MTQ4Nzg4MDgzMywiZXhwIjoxNTE5NDE2ODMzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.DoYsgsM-hGhpmBxix0fvn6cTLmDcITepQ0NJg2t-CXBF4tomiGsTS58cQjZvcXARQ8GJ3l_4k9aUPd1Avm55sDVS6Jem7guK2JUzrQ6z2EObnnw_PKyEWaxn10qwDfb9Aiz9kCE4jnEYgK0MNEnj2Ud7-dx2j9uxXZpaRfS6LQFp5xidIoIiL5utvI_z1ZO9-5O73xOrltJ6HvUWkW0n1CmmulVk3aE_TYr27Uli8RV6gVVcb60i6iJG9NAF4V76iET5jQBKF542SPocjiSEUzifG-5ohdOBgr8U-gvKW-bN-nCiQcTO7uUnCaaBLMvGDrH41qnHu-2kDnyp0BGohRKF9swfOTUQVvnMv4Xc92m6buJ0O1JtKlv_WTfar2Qc8zv_VpkCbPF13e4BRLpQmD80MTKyYpEB6lR3XxlnqQc6YPWSMyy8RbhSz8TeEmKIU4osHQJ9r6NAccsz7vkVqo6W3UJjrbUiZ7-58hOxGXJtuB0CCsPPG0CnMSWwOEeTt_kAuxGQOZHdLTAzMVRr94ZRVsbdjzCBfLq4IkWROaeslstmzexTNVW4PfHRXq7ePDbfJDaSvLOuwEJrJkbuqjZaqHIVRr9tcAlRDYcKEIRdHQoKOZx6dgzYtoIyeIf2898a9sI-LPO4NvczjzRSWFV2dZFPsB5RX3e5App2pQk");
        } catch (error) {
            console.log(error);
        }

    };
    saveFolder(name:string,callback?: any):void{
        try {

        var formData = {
            authorized_app: 'true',
            folderId: 'undefined',
            nested_name: name,


        };
        request.post({ url: 'https://streamupbox.com/api/folders', formData: formData }, function (err, response, body) {
                this.httpResponse = response.body;
                if (typeof (callback) === "function")
                    return callback({
                        response: this.httpResponse
                    });

         }).auth(null, null, true, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3N2FjOGEzZGIxMGQyN2EwZmM2YjhhYzYyNGY4NWFiOTJiMTBkYzY5NTMxYjY5N2FlM2I0YWIwNjQxODQ3MmVkZTUxOTJhMWEwYzc5NjU0In0.eyJhdWQiOiI1IiwianRpIjoiYjc3YWM4YTNkYjEwZDI3YTBmYzZiOGFjNjI0Zjg1YWI5MmIxMGRjNjk1MzFiNjk3YWUzYjRhYjA2NDE4NDcyZWRlNTE5MmExYTBjNzk2NTQiLCJpYXQiOjE0ODc4ODA4MzMsIm5iZiI6MTQ4Nzg4MDgzMywiZXhwIjoxNTE5NDE2ODMzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.DoYsgsM-hGhpmBxix0fvn6cTLmDcITepQ0NJg2t-CXBF4tomiGsTS58cQjZvcXARQ8GJ3l_4k9aUPd1Avm55sDVS6Jem7guK2JUzrQ6z2EObnnw_PKyEWaxn10qwDfb9Aiz9kCE4jnEYgK0MNEnj2Ud7-dx2j9uxXZpaRfS6LQFp5xidIoIiL5utvI_z1ZO9-5O73xOrltJ6HvUWkW0n1CmmulVk3aE_TYr27Uli8RV6gVVcb60i6iJG9NAF4V76iET5jQBKF542SPocjiSEUzifG-5ohdOBgr8U-gvKW-bN-nCiQcTO7uUnCaaBLMvGDrH41qnHu-2kDnyp0BGohRKF9swfOTUQVvnMv4Xc92m6buJ0O1JtKlv_WTfar2Qc8zv_VpkCbPF13e4BRLpQmD80MTKyYpEB6lR3XxlnqQc6YPWSMyy8RbhSz8TeEmKIU4osHQJ9r6NAccsz7vkVqo6W3UJjrbUiZ7-58hOxGXJtuB0CCsPPG0CnMSWwOEeTt_kAuxGQOZHdLTAzMVRr94ZRVsbdjzCBfLq4IkWROaeslstmzexTNVW4PfHRXq7ePDbfJDaSvLOuwEJrJkbuqjZaqHIVRr9tcAlRDYcKEIRdHQoKOZx6dgzYtoIyeIf2898a9sI-LPO4NvczjzRSWFV2dZFPsB5RX3e5App2pQk");
        } catch (error) {
            console.log(error);
        }
    }
    

}
