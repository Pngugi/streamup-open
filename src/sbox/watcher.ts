
import { Notification } from './../../notification';
import { Reaction } from './Reaction';
import { Config } from "./config";
import { setInterval } from './common/platform';
import { uploadLocalFileToOnline as Uploader } from './uploadLocalFileToOnline';
import { Storage } from './storage';
import fs = require('fs');
import chokidar = require('chokidar');
import os = require('os');
import request = require('request');

class MaxFolderName {
    public maxLenght: number = 100;
    public appFolderLenght: number = 6;
}
interface Fresponse {
    response: {
        status: number,
        data: {
            id: number,
            name: string,
            type: string,
            size: string,
            parent: number,
            has_copy: boolean,
            user_id: number
        }
    }
}
export class Watcher {

    constructor() {

    }
    public downloadOnFly(uri: string, disiredFname: string, absolutePath: string, callback?: any) {


        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            // console.log(body);
            // console.log(res);
            request(uri).pipe(fs.createWriteStream(os.homedir() + '/Sbox/' + absolutePath + '/' + disiredFname)).on('close', callback);

        }).auth(null, null, true, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4YTJlYTg1YmY1MmY2MjNhOGY3OGJmOTVlMjQyMWNhMDJjZTE3OGZiNDEyZGNhMzI3MWMxMTBkNzk5MWQ3ZDJiYjhkZTFiMDE5NjBmNzA4In0.eyJhdWQiOiIxIiwianRpIjoiZjhhMmVhODViZjUyZjYyM2E4Zjc4YmY5NWUyNDIxY2EwMmNlMTc4ZmI0MTJkY2EzMjcxYzExMGQ3OTkxZDdkMmJiOGRlMWIwMTk2MGY3MDgiLCJpYXQiOjE0ODM4MjM5MTQsIm5iZiI6MTQ4MzgyMzkxNCwiZXhwIjoxNTE1MzU5OTE0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.WURBFzc6AoCGAEAnfZ5pOXQF3X0ffqPKhMkVzyTrd-EgSMAiowJ5RY9hJ38iqFiKUsXBi80gM8TZOiWN3-ynbeaDveW-Rx4Veh6DZ9hdY0FHV962AK3feqpmFZNQhkcP6h3BxK9UHPsg3K_qhsQGzaWlaYw6dZqwU5hD2ceeWV9fm3_3Q5IoN9WD0b5f98gL1Ly3Pvg2xgkyLdnAeU8LbRDfp0eTIEk3jxXouGPa3Zrabm8rQhAMomHfHNtSQw-6xkPVSnSOc_lwNxa9Nj6mXT6RovzNprilctfgo6mEx-zU3YnCMj7oFdri67XQQhf05ylddJwKGC214I0A_rCrKlFGuX5Q4eoXtl-pdh3dslxlIQq7FkPdOVEbGUxOhpxluOuNRxlUzMbrymU1E0Zur1DoVLDaXaQVnWsGbt4FNIwEG08CA4BYQUvBhiLAYaYZwHSJ-nS1D_AIo1FZFQ5DicSPF6ySRrG2Lno-ifP23CY2uHui01Pi3U7mfaWb9EjIU6HI0w1AZ3L0FvlRsnSZJIigZnjV9I914muzPoU84ec5iNA_mbLzKd1mosGhJsgYMHTHr2B5uW5LYGS61f3SJByp41sv4VblzlkuLvPX9LP4XOauwjYsM6gVrt_Uqf_ZnM1fvDcbaclv8ZdcXMqLoclLtujPIErKpSI1UZOY04Q");

    }
    public watch() {


        new Config();
        var watcher = chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./, persistent: true });

        watcher
            .on('add', function (path: string) {


            })
            .on('addDir', function (path: string, stat) {

                var Sequelize = require('sequelize');
                var sequelize = new Sequelize(undefined, undefined, undefined, {
                    dialect: 'sqlite',
                    // SQLite only
                    storage: '../database.db'
                });
                var User = sequelize.define('user', {
                    firstName: {
                        type: Sequelize.STRING,
                        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
                    },
                    lastName: {
                        type: Sequelize.STRING
                    }
                }, {
                        freezeTableName: true // Model tableName will be the same as the model name
                    });

                User.sync({ force: true }).then(function () {
                    // Table created
                    return User.create({
                        firstName: 'John',
                        lastName: 'Hancock'
                    });
                });
                //TODO check if there is a failed add to queue reprocess it after
                var folderName = path.slice(os.homedir().length + new MaxFolderName().appFolderLenght, new MaxFolderName().maxLenght);

                if (!new Storage().exist(folderName)) {
                    new Uploader().createFolder(folderName, function (r: Fresponse) {

                        if (JSON.parse(r.response.toString()).status === 200) {

                            let data = JSON.parse(r.response.toString()).data;

                            new Storage().setItem({
                                id: data.id,
                                name: data.name,
                                type: data.type,
                                parent: data.parent,
                                size: data.size,
                                has_copy: data.has_copy,
                                user_id: data.user_id
                            }, function (resp) {
                                console.log(resp);
                            });
                        }

                    });
                } else {
                    console.log('folder exist sir no duplicate anymore');
                }


            })
            .on('change', function (path) {

            })
            .on('unlink', function (path) {

            })
            .on('unlinkDir', function (path) {

            })
            .on('error', function (error) {

            });

    }

}

/**deals with listnening of broadcasted event and save file on Local Disk accordingly */
import Redis = require('ioredis');
let redis = new Redis();
import isOnline = require('is-online');
isOnline().then(online => {

    if (!online) {
        redis.subscribe('files-channel');
        redis.on('message', function (channel, message) {

            let serialized = JSON.parse(message);
            console.log(serialized.data.filePath);
            //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!

            new Watcher().downloadOnFly('http://localhost:8000/api/downloads/file/' + serialized.data.fileHandle + '/' + serialized.data.folderId, serialized.data.fileName, '', function (res: boolean) {
                console.log('done');
            });

        });
    }
});

//init a wather async
new Watcher().watch();
