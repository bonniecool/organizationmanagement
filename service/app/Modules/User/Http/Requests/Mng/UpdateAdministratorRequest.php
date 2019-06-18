<?php

namespace App\Modules\User\Http\Requests\Mng;

use Illuminate\Routing\Router;
use Damnyan\Cmn\Abstracts\ApiRequest;

class UpdateAdministratorRequest extends ApiRequest
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
     * @param \Illuminate\Routing\Router $router
     *
     * @return array
     */
    public function rules(Router $router)
    {
        $userId = $router->input('userId');

        return [
            // 'email' => 'required|email|unique:users,email,'.$userId.',id',
            'password' => 'confirmed',
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required',
            'suffix' => '',
            'photo' => 'active_url'
        ];
    }
}
