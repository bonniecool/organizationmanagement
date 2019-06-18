<?php

namespace App\Modules\Payment\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class PaymentReceiveRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'refno' => 'required',
            'txnid' => 'required|exists:payments,txnid',
            'status' => 'required'
        ];
    }
}
