
/**
* Notiification
*/
import notifier = require('node-notifier');
export class Notification {
    protected title: string;
    protected message: string;
    constructor(title: string, message: string) {
        this.title = title;
        this.message = message;
        this.notify();
    }
    notify() {
        notifier.notify({
            'title': 'A folder is Created',
            'message': 'Folder synced!'
        });
    }
}
