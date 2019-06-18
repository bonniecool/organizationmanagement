<?php

namespace App\Modules\User\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;

class AdministratorProfileRequest extends ApiRequest
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
        switch($this->method())
        {
            case 'GET':
                {
                    return [];
                }
            case 'DELETE':
                {
                    return [];
                }
            case 'POST':
                {
                    return [
                        'email' => 'required|email|unique:users,email',
                        'password' => 'required|min:6|confirmed',
                        'password_confirmation' => 'required|min:6',
                        'first_name' => 'required',
                        'middle_name' => 'required',
                        'last_name' => 'required',
                        'gender' => 'required|in:MALE,FEMALE',
                        'birth_date' => 'required|before:today',
                        'photo'     => 'required',
                        'mobile_number' => 'required'
                    ];
                }
            case 'PUT':
                {
                    return [
                        'first_name' => 'required',
                        'middle_name' => 'required',
                        'last_name' => 'required',
                        'gender' => 'required|in:MALE,FEMALE',
                        'birth_date' => 'required|before:today',
                        'photo'     => 'required',
                        'mobile_number' => 'required'
                    ];
                }

            default:break;
        }
    }
}
