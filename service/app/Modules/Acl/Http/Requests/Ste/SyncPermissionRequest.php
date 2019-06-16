<?php

namespace App\Modules\Acl\Http\Requests\Ste;

use Illuminate\Routing\Router;
use Damnyan\Cmn\Abstracts\ApiRequest;

class SyncPermissionRequest extends ApiRequest
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
            'acl_permission_code' => 'required|array',
            'acl_permission_code.*' => 'exists:acl_permissions,code'
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
            'acl_permission_code.*' => 'permission',
        ];
    }
}
