<?php

namespace App\Modules\Payment\Services;

use GuzzleHttp\Client;

class Multipay
{

    protected $client;

    protected $headers;

    protected $config;

    protected $url;

    public function __construct()
    {
        $this->config  = config('module_payment.multipay');
        $this->url     = $this->config['url'];
        $this->client  = new Client;
        $this->headers = [
            'X-MultiPay-Code' => $this->config['code'],
            'X-MultiPay-Token' => $this->config['token'],
        ];
    }

    public function generate($data)
    {
        // $data['callback_url'] = 'https://0b5dcb55.ngrok.io/callback/payment/multipay';
        $data['callback_url']       = route($this->config['route_name']);
        $data['description']['url'] = config('app.front_end_url');

        try {
            $response = $this->client
            ->post(
                $this->url,
                [
                    'headers' => $this->headers,
                    'form_params' => $data,
                ]
            );
        } catch (Exception $e) {
            return ApiRequest::badRequest('Something went wrong!');
        }

        $data = json_decode($response->getBody()->getContents(), true);

        return $data['data'];
    }
}
