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
export interface IStorageService {
	getItem<T>(key: string, defaultValue?: T): T;
	setItem(key: string, data: any): void;
	removeItem(key: string): void;
}

export class Storage implements IStorageService {
	private URL: string;
	private isHosted: boolean;
	private applyGit: boolean;
	private isFolder: boolean;
	private dbPath: string;
	private database: any = null;
	private db: any;
	constructor(encryptKey?:string) {

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
		this.db.defaults({ userData: [] })
			.value()
	}

	public uploadFile() {

	}
	load(): Object {
		
		return this.db.get('posts').value();
	}
	setItem(str: string, data: Object): void {
		
		this.db.get(str).push(data);
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