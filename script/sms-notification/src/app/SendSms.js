import _ from 'lodash';
import https from 'https';
import Promise from 'promise';
import request from 'request';
import Async from 'asyncawait/async';
import Await from 'asyncawait/await';

class SendSms {
    constructor(data) {
        this.data = data.data;
    }

    process() {
        return new Promise((resolve, reject) => {
            let payload = this.data;
            Async( (customer) => {
                console.log(customer.mobile_number);
                Await (this.pushSms(payload));
            });
            resolve();
        });
    }

    //
    // companyCustomer(payload) {
    //     return new Promise((resolve, reject) => {
    //         Customer.getAllCustomer(payload).then( customers => {
    //             // console.log(customers);
    //                 customers.forEach( Async( (customer) => {
    //                     console.log(customer.mobile_number);
    //                     Await (this.pushSms(customer, payload));
    //                 }));
    //                 resolve();
    //         });
    //     });
    // }
    //
    // branchCustomer(payload) {
    //     return new Promise((resolve, reject) => {
    //         Customer.getBranchCustomer(payload).then( customers => {
    //             // console.log(customers);
    //             customers.forEach( Async( (customer) => {
    //                 console.log(customer.mobile_number);
    //                 Await (this.pushSms(customer, payload));
    //             }));
    //             resolve();
    //         });
    //     });
    // }

    pushSms(payload) {
            let content = `${payload.content}`;
            let formData = {
                'number'       : `${payload.mobile_number}`,
                'message'      : content
            };
            request.post({url:'https://staging-ws.txtbox.com/v1/sms/push', formData: formData, headers: {
                    "X-TXTBOX-Auth": "3a9607d8435211394037443799615296"
                }}, function(err,httpResponse,body) {
                if(httpResponse.statusCode == 200) {
                    console.log(`Sent sms to ${payload.mobile_number}`);
                }
            });
    }
}
export default SendSms;
