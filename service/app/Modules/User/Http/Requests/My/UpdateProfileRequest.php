<?php

namespace App\Modules\User\Http\Requests\My;

use Damnyan\Cmn\Abstracts\ApiRequest;

class UpdateProfileRequest extends ApiRequest
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
        $user = request()->user();
        return config("module_user.request.$user->profile_type.update");
    }
}
