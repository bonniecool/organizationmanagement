<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Damnyan\Cmn\Abstracts\ApiRequest;

class UpdatePhotoRequest extends ApiRequest
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
            'photo' => 'required|url',
        ];
    }
}
