<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Support\Facades\Validator;

class CreateDependencyContactInformationRequest extends ApiRequest
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
        $rules = [
            'street' => 'required',
            'municipality_code' => 'required',
            'province_code' => 'required',
            'occupation' => 'required',
            'office_number' => 'required',
            'office_address' => 'required'
        ];


        return $rules;
    }
}
