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
	setItem(data: any): void;
	removeItem(key: string): void;
}

export class Storage implements IStorageService {

	private isHosted: boolean;
	private isFolder: boolean;
	private dbPath: string;
	private database: any = null;
	private db: any;

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
		}catch(e){

		}
		
	}

	public uploadFile() {

	}
	load(): Object {

		return this.db.get('posts').value();
	}
	setItem(data: Object): void {

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