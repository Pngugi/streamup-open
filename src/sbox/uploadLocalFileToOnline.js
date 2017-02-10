"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var os = require('os'), request = require('request'), fs = require('fs');
var config_1 = require("./config");
var uploadLocalFileToOnline = (function (_super) {
    __extends(uploadLocalFileToOnline, _super);
    function uploadLocalFileToOnline(osPath, URL) {
        if (URL === void 0) { URL = process.env.URL; }
        _super.call(this);
        this.osPath = os.homedir() + '/Sbox';
    }
    uploadLocalFileToOnline.prototype.post = function (filePath, callback) {
        var formData = {
            authorized_app: 'true',
            folderId: 'undefined',
            file: fs.createReadStream(filePath)
        };
        try {
            request.post({ url: this.uploadApi(), formData: formData }, function (err, response, body) {
                this.httpResponse = response.body;
                if (typeof (callback) === "function")
                    return callback({
                        response: this.httpResponse
                    });
                //get your personal access token at https://streamupbox.com/developers
            }).auth(null, null, true, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4YTJlYTg1YmY1MmY2MjNhOGY3OGJmOTVlMjQyMWNhMDJjZTE3OGZiNDEyZGNhMzI3MWMxMTBkNzk5MWQ3ZDJiYjhkZTFiMDE5NjBmNzA4In0.eyJhdWQiOiIxIiwianRpIjoiZjhhMmVhODViZjUyZjYyM2E4Zjc4YmY5NWUyNDIxY2EwMmNlMTc4ZmI0MTJkY2EzMjcxYzExMGQ3OTkxZDdkMmJiOGRlMWIwMTk2MGY3MDgiLCJpYXQiOjE0ODM4MjM5MTQsIm5iZiI6MTQ4MzgyMzkxNCwiZXhwIjoxNTE1MzU5OTE0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.WURBFzc6AoCGAEAnfZ5pOXQF3X0ffqPKhMkVzyTrd-EgSMAiowJ5RY9hJ38iqFiKUsXBi80gM8TZOiWN3-ynbeaDveW-Rx4Veh6DZ9hdY0FHV962AK3feqpmFZNQhkcP6h3BxK9UHPsg3K_qhsQGzaWlaYw6dZqwU5hD2ceeWV9fm3_3Q5IoN9WD0b5f98gL1Ly3Pvg2xgkyLdnAeU8LbRDfp0eTIEk3jxXouGPa3Zrabm8rQhAMomHfHNtSQw-6xkPVSnSOc_lwNxa9Nj6mXT6RovzNprilctfgo6mEx-zU3YnCMj7oFdri67XQQhf05ylddJwKGC214I0A_rCrKlFGuX5Q4eoXtl-pdh3dslxlIQq7FkPdOVEbGUxOhpxluOuNRxlUzMbrymU1E0Zur1DoVLDaXaQVnWsGbt4FNIwEG08CA4BYQUvBhiLAYaYZwHSJ-nS1D_AIo1FZFQ5DicSPF6ySRrG2Lno-ifP23CY2uHui01Pi3U7mfaWb9EjIU6HI0w1AZ3L0FvlRsnSZJIigZnjV9I914muzPoU84ec5iNA_mbLzKd1mosGhJsgYMHTHr2B5uW5LYGS61f3SJByp41sv4VblzlkuLvPX9LP4XOauwjYsM6gVrt_Uqf_ZnM1fvDcbaclv8ZdcXMqLoclLtujPIErKpSI1UZOY04Q");
        }
        catch (error) {
            console.log(error);
        }
    };
    ;
    uploadLocalFileToOnline.prototype.createFolder = function (name, callback) {
        try {
            var formData = {
                authorized_app: 'true',
                folderId: 'undefined',
                nested_name: name
            };
            request.post({ url: 'http://localhost:8000/api/folders', formData: formData }, function (err, response, body) {
                this.httpResponse = response.body;
                if (typeof (callback) === "function")
                    return callback({
                        response: this.httpResponse
                    });
            }).auth(null, null, true, "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4YTJlYTg1YmY1MmY2MjNhOGY3OGJmOTVlMjQyMWNhMDJjZTE3OGZiNDEyZGNhMzI3MWMxMTBkNzk5MWQ3ZDJiYjhkZTFiMDE5NjBmNzA4In0.eyJhdWQiOiIxIiwianRpIjoiZjhhMmVhODViZjUyZjYyM2E4Zjc4YmY5NWUyNDIxY2EwMmNlMTc4ZmI0MTJkY2EzMjcxYzExMGQ3OTkxZDdkMmJiOGRlMWIwMTk2MGY3MDgiLCJpYXQiOjE0ODM4MjM5MTQsIm5iZiI6MTQ4MzgyMzkxNCwiZXhwIjoxNTE1MzU5OTE0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.WURBFzc6AoCGAEAnfZ5pOXQF3X0ffqPKhMkVzyTrd-EgSMAiowJ5RY9hJ38iqFiKUsXBi80gM8TZOiWN3-ynbeaDveW-Rx4Veh6DZ9hdY0FHV962AK3feqpmFZNQhkcP6h3BxK9UHPsg3K_qhsQGzaWlaYw6dZqwU5hD2ceeWV9fm3_3Q5IoN9WD0b5f98gL1Ly3Pvg2xgkyLdnAeU8LbRDfp0eTIEk3jxXouGPa3Zrabm8rQhAMomHfHNtSQw-6xkPVSnSOc_lwNxa9Nj6mXT6RovzNprilctfgo6mEx-zU3YnCMj7oFdri67XQQhf05ylddJwKGC214I0A_rCrKlFGuX5Q4eoXtl-pdh3dslxlIQq7FkPdOVEbGUxOhpxluOuNRxlUzMbrymU1E0Zur1DoVLDaXaQVnWsGbt4FNIwEG08CA4BYQUvBhiLAYaYZwHSJ-nS1D_AIo1FZFQ5DicSPF6ySRrG2Lno-ifP23CY2uHui01Pi3U7mfaWb9EjIU6HI0w1AZ3L0FvlRsnSZJIigZnjV9I914muzPoU84ec5iNA_mbLzKd1mosGhJsgYMHTHr2B5uW5LYGS61f3SJByp41sv4VblzlkuLvPX9LP4XOauwjYsM6gVrt_Uqf_ZnM1fvDcbaclv8ZdcXMqLoclLtujPIErKpSI1UZOY04Q");
        }
        catch (error) {
            console.log(error);
        }
    };
    return uploadLocalFileToOnline;
}(config_1.Config));
exports.uploadLocalFileToOnline = uploadLocalFileToOnline;
