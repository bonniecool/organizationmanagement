<?php

namespace App\Modules\Member\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class AttendRequest extends ApiRequest
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
            'pin' => 'required|max:4|min:4'
        ];
    }
}
