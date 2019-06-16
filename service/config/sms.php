<?php
return [
    'status' => env('SMS_NOTIFICATION', false),
    'url' => env('SMS_URL', 'https://staging-ws.txtbox.com/v1/sms/push'),
    'token' => env('SMS_TOKEN')
];
