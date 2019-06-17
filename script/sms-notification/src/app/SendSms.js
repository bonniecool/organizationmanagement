import _ from 'lodash';
import https from 'https';
import Promise from 'promise';
import request from 'request';
import SmsLog from '../models/SmsLog';
import Async from "asyncawait/async";

class SendSms {
    constructor(data) {
        this.data = data.data;
    }

    process() {
        return new Promise((resolve, reject) => {
            let payload = this.data;
            SmsLog.create(payload).then( () => {
                let sms = this.pushSms(payload);
                sms.then( res => {
                    resolve(res);
                }).catch( err => {
                    reject(err);
                });
            });
        });
    }

    pushSms(payload) {
        return new Promise((resolve, reject) => {
            let content = `${payload.content}`;
            let formData = {
                'number': `${payload.mobile_number}`,
                'message': `${payload.subject}\n${content}`
            };
            console.log(payload);
            request.post({
                url: 'https://ws-staging.txtbox.com/v1/sms/push', formData: formData, headers: {
                    "X-TXTBOX-Auth": "3a9607d8435211394037443799615296"
                }
            }, function (err, httpResponse, body) {
                console.log(httpResponse.body);
                if (httpResponse.statusCode == 200) {
                    resolve();
                }
                resolve();
            });
        });
    }
}
export default SendSms;
