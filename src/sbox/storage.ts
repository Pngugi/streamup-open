/*---------------------------------------------------------------------------------------------
 *  Copyright (c) StreamUpBox . All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// import * as path from 'path';
// import fs = require('fs');
export interface IStorageService {
	getItem<T>(key: string, defaultValue?: T): T;
	setItem(key: string, data: any): void;
	removeItem(key: string): void;
}

export class Storage implements IStorageService{
    private URL:string;
    private isHosted:boolean;
    private applyGit:boolean;
    private isFolder:boolean;
    private dbPath: string;
	private database: any = null;

    constructor(URL:string){
        this.URL = URL;

        // this.dbPath = path.join(this.URL, 'storage.json');
    }
    /**
     * uploadFile
     */
    public uploadFile() {
        
    }
    private load(): any {
		try {
			// return JSON.parse(fs.readFileSync(this.dbPath).toString()); // invalid JSON or permission issue can happen here
		} catch (error) {
			
			return {};
		}
	}
    setItem(key: string, data: any): void {
        if (!this.database) {
			this.database = this.load();
		}

		// Shortcut for primitives that did not change
		if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
			if (this.database[key] === data) {
				return;
			}
		}

		this.database[key] = data;
		this.save();
    }
    removeItem(key: string): void {
        if (!this.database) {
			this.database = this.load();
		}

		if (this.database[key]) {
			delete this.database[key];
			this.save();
		}
    }
    getItem<T>(key: string, defaultValue?: T): T {
        if (!this.database) {
			this.database = this.load();
		}

		const res = this.database[key];
		if (typeof res === 'undefined') {
			return defaultValue;
		}

		return this.database[key];
    }
    private save(): void {
		try {
			// fs.writeFileSync(this.dbPath, JSON.stringify(this.database, null, 4)); // permission issue can happen here
		} catch (error) {
			
		}
	}
}