<?php

namespace App\Modules\User\Http\Requests\Mng;

use Damnyan\Cmn\Abstracts\ApiRequest;

class CreateAdministratorRequest extends ApiRequest
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
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required',
            'suffix' => '',
            'photo' => 'active_url'
        ];
    }
}
