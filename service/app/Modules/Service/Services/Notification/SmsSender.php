<?php
namespace App\Modules\Service\Services\Notification;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Exception\RequestException;

class SmsSender
{
    /**
     * @param array $data
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function send(array $data)
    {
        if (!config('sms.status')) {
            return;
        }

        $client                 = new Client();
        $options['headers']     = [
            'X-TXTBOX-Auth' => config('sms.token')
        ];
        $options['form_params'] = [
            'message' => $data['message'],
            'number' => $data['number']
        ];

        try {
            $response = $client->request('POST', config('sms.url'), $options);
            $response->getBody()->getContents();
        } catch (RequestException $e) {
            Log::error($e->getMessage());
            return false;
        }

        return true;
    }
}