'use strict';

import figlet from 'figlet';
import GulpUtil from 'gulp-util';
import Firebase from 'firebase-admin';
import FirebaseQueue from 'firebase-queue';
import Config from '../../config.json';
import FirebaseServiceAccount from './credentials.json';
import SendSms from './app/SendSms';

class Event
{
    constructor () {
        this.fb = Firebase.initializeApp({
          credential: Firebase.credential.cert(FirebaseServiceAccount),
          databaseURL: Config.fbUrl,
          apiKey: Config.apiKey
        });
    }
    initialize = () => {
        console.log(GulpUtil.colors.green(figlet.textSync("SMS BLASTING SCRIPT", {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'full'
        })));
        
        this._sendSms();
    }

    _sendSms() {
        let options = {
            'specId': 'sms_notification',
            'numWorkers': 3,
            'suppressStack': true
        };

        let ref = this.fb.database().ref('queue');
        new FirebaseQueue(ref, options, (data, progress, resolve, reject) => {
            console.log(data);
            // let sendSms = new SendSms(data).process();
            // sendSms.then( res => {
            //     console.log(res);
            //     resolve(res);
            // }).catch( err => {
            //     console.log(err);
            //     reject(err);
            // });
        });
    }
}

let event = new Event();
event.initialize();
