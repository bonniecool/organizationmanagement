<?php

namespace App\Modules\Common\Services;

use Multipay\Multipay;
use Damnyan\Cmn\Exceptions\BadRequestException;
use App\Modules\Common\Contracts\MultiPayServiceInterface;

class MultiPayService implements MultiPayServiceInterface
{

    /**
     * Undocumented variable
     *
     * @var Multipay
     */
    protected $multipay;

    /**
     * constractor
     *
     * @param String $code  code
     * @param String $token token
     */
    public function __construct($code, $token)
    {
        $this->multipay = new Multipay($code, $token);
    }

    /**
     * generate data
     *
     * @param array $data data
     * @return void
     */
    public function generate(array $data)
    {
        $response = $this->multipay->generate(
            [
                'name' => $data['name'],
                'amount' => $data['amount'],
                'mobile' => $data['mobile'],
                'email' => $data['email'],
                'txnid' => $data['txnid'],
                'callback_url' => $data['callback_url']
            ]
        );

        if ($response['status'] != 200) {
            throw new BadRequestException(trans('cmn::messages.error_occured'));
        }

        return $response;
    }
}
