"use strict";
var os = require('os');
var Config = (function () {
    function Config() {
        this.process = process.env;
        this.setGit();
    }
    Config.prototype.getTokenKey = function (key) {
        if (key === void 0) { key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY4YTJlYTg1YmY1MmY2MjNhOGY3OGJmOTVlMjQyMWNhMDJjZTE3OGZiNDEyZGNhMzI3MWMxMTBkNzk5MWQ3ZDJiYjhkZTFiMDE5NjBmNzA4In0.eyJhdWQiOiIxIiwianRpIjoiZjhhMmVhODViZjUyZjYyM2E4Zjc4YmY5NWUyNDIxY2EwMmNlMTc4ZmI0MTJkY2EzMjcxYzExMGQ3OTkxZDdkMmJiOGRlMWIwMTk2MGY3MDgiLCJpYXQiOjE0ODM4MjM5MTQsIm5iZiI6MTQ4MzgyMzkxNCwiZXhwIjoxNTE1MzU5OTE0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.WURBFzc6AoCGAEAnfZ5pOXQF3X0ffqPKhMkVzyTrd-EgSMAiowJ5RY9hJ38iqFiKUsXBi80gM8TZOiWN3-ynbeaDveW-Rx4Veh6DZ9hdY0FHV962AK3feqpmFZNQhkcP6h3BxK9UHPsg3K_qhsQGzaWlaYw6dZqwU5hD2ceeWV9fm3_3Q5IoN9WD0b5f98gL1Ly3Pvg2xgkyLdnAeU8LbRDfp0eTIEk3jxXouGPa3Zrabm8rQhAMomHfHNtSQw-6xkPVSnSOc_lwNxa9Nj6mXT6RovzNprilctfgo6mEx-zU3YnCMj7oFdri67XQQhf05ylddJwKGC214I0A_rCrKlFGuX5Q4eoXtl-pdh3dslxlIQq7FkPdOVEbGUxOhpxluOuNRxlUzMbrymU1E0Zur1DoVLDaXaQVnWsGbt4FNIwEG08CA4BYQUvBhiLAYaYZwHSJ-nS1D_AIo1FZFQ5DicSPF6ySRrG2Lno-ifP23CY2uHui01Pi3U7mfaWb9EjIU6HI0w1AZ3L0FvlRsnSZJIigZnjV9I914muzPoU84ec5iNA_mbLzKd1mosGhJsgYMHTHr2B5uW5LYGS61f3SJByp41sv4VblzlkuLvPX9LP4XOauwjYsM6gVrt_Uqf_ZnM1fvDcbaclv8ZdcXMqLoclLtujPIErKpSI1UZOY04Q"; }
        return process.env.Key = key;
    };
    Config.prototype.onLineURL = function (URL) {
        if (URL === void 0) { URL = "https://streamupbox/api/upload"; }
        return process.env.URLOnLine = URL;
    };
    Config.prototype.uploadApi = function (uploadApi) {
        if (uploadApi === void 0) { uploadApi = "http://localhost:8000/api/upload"; }
        return process.env.uploadApi = uploadApi;
    };
    Config.prototype.folderApi = function (folderApi) {
        if (folderApi === void 0) { folderApi = 'http://localhost:8000/api/folders'; }
        return process.env.folderApi;
    };
    Config.prototype.diskPath = function (URL) {
        if (URL === void 0) { URL = os.homedir + 'sbox'; }
        return process.env.diskPath = URL;
    };
    Config.prototype.setGit = function () {
        process.env.userName = "richie@working";
        process.env.userEmail = "muragijimanarichard@gmail.com";
    };
    return Config;
}());
exports.Config = Config;
