<?php

namespace App\Modules\User\Http\Requests\Ste;

use Damnyan\Cmn\Abstracts\ApiRequest;

class AccountActivationRequest extends ApiRequest
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
            'uuid' => 'required',
        ];
    }
}
