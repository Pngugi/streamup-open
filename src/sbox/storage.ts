import { ObjectComparator as Compare } from './ObjectComparator';
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


interface DirObject {
	name: string,
	birthtime: string
}
export interface IStorageService {

	setItem(data: any, filePath: string, buffer: Buffer): void;

}

export class Storage extends Compare implements IStorageService {

	private response: any;
	constructor(encryptKey?: string) {
		super();
		try {
			CryptoJS = new CryptoJS("key");
		} catch (e) { }
	}

	setItem(data: DirObject, callback?: any): void {
		const db = low('db.json', {
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
		// console.log(this.exist(data.name))
		if(!this.exist(data.name)){
			
			this.response = db.get("posts").push(data).cloneDeep()
				.value()
			return callback({
				response: 200,
				data: ''
			});
		}
			
	}

	private exist(name: string): boolean {
		console.log(name);
		var res: boolean;
		const db = low('db.json', {
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
		db.get({}).__wrapped__.posts.forEach(element => {

			if (element.name == name) {
				res = true;
				
			} else {
				res = false;
				
			}

		});
		return res;

	}
}
