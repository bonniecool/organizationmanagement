'use strict'

import MySQL from '../database/mysql';
import moment from 'moment';

class SmsLog{

    constructor() {
        this.db = MySQL;
        this.table = 'sms_logs';
    }

    create(payload) {
        return new Promise((resolve, reject) => {

            let data = [{
                'date_time': moment().format('Y-MM-DD H:m:s'),
                'recipient_id': payload.member_id,
                'reminder_id': payload.reminder_id,
                'sms_rate': 0.50
            }];
            console.log(data);
        let model = this.db.insert(data).from(this.table);
        resolve(model);
        });
    }
}

export default new SmsLog;