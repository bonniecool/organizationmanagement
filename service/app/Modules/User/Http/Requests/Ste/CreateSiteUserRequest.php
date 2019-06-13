<?php

namespace App\Modules\User\Http\Requests\Ste;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;

class CreateSiteUserRequest extends ApiRequest
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
//            'captcha' => 'required|recaptcha',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'first_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u'
            ],
            'middle_name' => 'regex:/^[\p{L} ]+$/u',
            'last_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u'
            ],
            'mobile_number' => 'required',
            'name' => 'nullable',
            'organization_name' => 'nullable',
        ];
    }

    public function attributes()
    {
        return [
            'tac' => 'terms and condition',
            'name' => 'Organization Name'
        ];
    }

    public function messages()
    {
        return [
            'tac.in' => 'The :attribute must be accepted.',
        ];
    }
}
