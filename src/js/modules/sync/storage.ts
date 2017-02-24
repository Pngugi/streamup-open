import { ObjectComparator as Compare } from './ObjectComparator';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) StreamUpBox . All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as path from 'path';
import fs = require('fs');

const low = require('lowdb')
import CryptoJS = require("cryptr");
import Sequelize = require('sequelize');
import os = require('os');
import db = require('../../../../models/index.js');

interface DirObject {
	id: number,
	name: string,
	type: string,
	size: string,
	parent: number,
	has_copy: boolean,
	user_id: number
}


export class Storage extends Compare {

	private response: any;
	constructor(encryptKey?: string) {
		super();

	}

	saveFolder(data?: DirObject, callback?: any): void {

		
		// db.Folder.sync({ force: true }).then(function () {
			
		// 	return User.create({
		// 		id: '1',
		// 		folderName: 'FolderName'
		// 	});
		// });

	}
	getFolder(): void {
		
		var findUserDevice = function (id) {
		
			return db.Folder.find({
				where: {
					id: id
				}
			}).then(function (device) {
				if (!device) {
					return 'not find';
				}
				return device.dataValues;
			});
		};
		findUserDevice(1).then(function (UserDevice) {
			console.log(UserDevice);
		});
	}


}

new Storage().saveFolder();
new Storage().getFolder();
