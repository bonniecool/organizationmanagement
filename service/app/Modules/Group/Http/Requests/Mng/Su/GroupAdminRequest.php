<?php

namespace App\Modules\Group\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;

class GroupAdminRequest extends ApiRequest
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
            'administrators' => 'array|required',
            'administrators.*' => 'required|exists:profile_administrators,id'
        ];
    }
}
