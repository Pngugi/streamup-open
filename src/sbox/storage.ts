/*---------------------------------------------------------------------------------------------
 *  Copyright (c) StreamUpBox . All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'path';
import fs = require('fs');
import { uploadLocalFileToOnline } from './uploadLocalFileToOnline';
const low = require('lowdb')
const fileAsync = require('lowdb/lib/file-async')
let CryptoJS = require("cryptr");
let os = require('os');
export interface IStorageService {
	getItem<T>(key: string, defaultValue?: T): T;
	setItem(data: any, filePath: string, buffer: Buffer): void;
	removeItem(key: string): void;
}

export class Storage implements IStorageService {

	private isHosted: boolean;
	private isFolder: boolean;
	private dbPath: string;
	private database: any = null;
	private db: any;
	private response: any;

	constructor(encryptKey?: string) {

		try {
			CryptoJS = new CryptoJS("key");
			this.db = low('db.json', {
				format: {
					deserialize: (str) => {
						const decrypted = CryptoJS.decrypt(str.toString())
						const obj = JSON.parse(decrypted)
						return obj
					},
					serialize: (obj) => {
						const str = JSON.stringify(obj)
						const encrypted = CryptoJS.encrypt(str)
						return encrypted
					}
				}
			});
		} catch (e) {

		}

	}

	public uploadFile() {

	}
	load(): Object {

		return this.db.get('posts').value();
	}
	setItem(data: any, callback?: any): void {
		try {
			
			let actualLenght = this.db.find(data).cloneDeep().__wrapped__.posts.length;
			let actualData = this.db.find(data).cloneDeep().__wrapped__.posts;
			let i;
			let permissionTosave = false;
			for (i = 0; i <= actualLenght; i++) {
				
				if (actualData[i] === data) {
					console.log("matching");
					permissionTosave = false;
					
				} else {
					permissionTosave = true;
				}
			}
			
			if (!permissionTosave)
				return callback({
					response: 300,
					message: 'synced no need to do it again'
				});

			if (permissionTosave) {

				console.log("one");

				// this.response = this.db.get("posts").push(data).cloneDeep()
				// 	.value()
				// return callback({
				// 	response: 200,
				// 	data: this.response
				// });
			} else {
				return callback({
					response: 200,
					data: 'no action taken'
				});
			}


		} catch (e) {

		}
	}
	saveOnDisk(data: Object, filPath?: string, buffer?: Buffer) {
		if (typeof (data) === "object")

			if (typeof (filPath) || typeof (buffer) !== "undefined")
				fs.createWriteStream(filPath, buffer);
		try {
			this.db.get("posts").push(data).cloneDeep()
				.value()
		} catch (error) {

		}
	}
	removeItem(key: string): void {

	}

	getItem<T>(key: string, defaultValue?: T): T {
		return this.db.get('posts').find({ id: key }).value()
	}
	save(str: string, data: Object): void {

		this.db.get('posts').push(data);

	}
}