<?php

namespace App\Modules\Acl\Http\Requests\Ste;

use Illuminate\Routing\Router;
use Damnyan\Cmn\Abstracts\ApiRequest;

class AttachPermissionRequest extends ApiRequest
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
     * @return array
     */
    public function rules(Router $router)
    {
        $roleId = $router->input('roleId');

        return [
            'acl_permission_code' => 'required|array',
            'acl_permission_code.*' => 'exists:acl_permissions,code'.
                '|unique:acl_permission_role,acl_permission_code,NULL,NULL,acl_role_id,'.$roleId
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
            'acl_permission_code' => 'permission',
            'acl_permission_code.*' => 'permission',
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
            'acl_permission_code.*.unique' => 'Permission/s already attached to role.',
        ];
    }
}
