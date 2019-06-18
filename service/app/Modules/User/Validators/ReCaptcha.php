<?php

namespace App\Modules\User\Validators;

use Carbon\Carbon;
use GuzzleHttp\Client;

class ReCaptcha
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        if (config('app.env') == 'local') {
            return true;
        }
        
        $client = new Client();
        $response = $client->post(
            config('captcha.google.url'),
            ['form_params'=>
                [
                    'secret' => config('captcha.google.secret'),
                    'response' => $value
                 ]
            ]
        );
    
        $body = json_decode((string)$response->getBody());

        return $body->success;
    }

}
