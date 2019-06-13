<?php

return [
    'provider_url' => env('SMS_PROVIDER_URL'),
    'provider_username' => env('SMS_PROVIDER_USERNAME'),
    'provider_password' => env('SMS_PROVIDER_PASSWORD'),
    'constants' => [
        'status' => [
            'processing' => 'PROCESSING',
            'sent' => 'SENT',
            'failed' => 'FAILED',
        ]
    ]
];
