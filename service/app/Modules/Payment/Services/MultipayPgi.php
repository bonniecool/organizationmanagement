<?php

namespace App\Modules\Payment\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class MultipayPgi
{

    protected $client;

    protected $headers;

    protected $config;

    protected $url;

    public function __construct()
    {
        $this->config  = config('module_payment.multipay');
        $this->url     = $this->config['url'];
        $this->headers = [
            'X-MultiPay-Code' => $this->config['code'],
            'X-MultiPay-Token' => $this->config['token'],
            'Content-Type' =>'application/x-www-form-urlencoded; charset=utf-8'
        ];
    }

    public function generate($data)
    {
        try {
            $client = new Client([
                'headers' => $this->headers,
                'form_params' => $data,
            ]);
            $request = new Request(
                "POST",
                $this->config['url'],
                $this->headers,
                http_build_query($data, null, '&')
            );
            $response = $client->send($request);
            return json_decode($response->getBody(), true);
        } catch (Exception $e) {
            return ApiRequest::badRequest('Something went wrong!');
        }
    }
}
