<?php

namespace App\Modules\Member\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class RegisterDeviceRequest extends ApiRequest
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
            'mac_address' => 'required',
            'has_logged' => 'required|in:1,0',
            'pin' => 'required|max:4|min:4'
        ];
    }
}
