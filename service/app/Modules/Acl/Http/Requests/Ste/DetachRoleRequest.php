<?php

namespace App\Modules\Acl\Http\Requests\Ste;

use Illuminate\Routing\Router;
use Damnyan\Cmn\Abstracts\ApiRequest;

class DetachRoleRequest extends ApiRequest
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
            'acl_role_id' => 'required|array',
            'acl_role_id.*' => 'exists:acl_roles,id'.
                '|exists:acl_role_user,acl_role_id,user_id,'.$userId
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'acl_role_id' => 'role',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'acl_role_id.*.exists' => 'Invalid role.',
        ];
    }
}
