<?php

// Include Guzzle. If using Composer:
// require 'vendor/autoload.php';

use GuzzleHttp\Pool;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

$client = new Client();

$request = new Request(
    "POST",
    "https://institution.multipay.ph/api/v1/transactions/generate",
    [
        "X-MultiPay-Code" => "MSYS_TEST_BILLER",
        "X-MultiPay-Token" => "2c1816316e65dbfcb0c34a25f3d6fe5589aef65d",
        "Content-Type" => "application/x-www-form-urlencoded; charset=utf-8"
    ],
    "amount=1&txnid=1111&name=test&email=npenaredondo%40gmail.com&mobile=09989668346");

$response = $client->send($request);
echo "Response HTTP : " . $response->getStatusCode() . "
";

