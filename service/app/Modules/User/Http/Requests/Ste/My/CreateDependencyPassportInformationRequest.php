<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Support\Facades\Validator;

class CreateDependencyPassportInformationRequest extends ApiRequest
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
            'passport_no' => '',
            'foreign_passport_holder' => 'required|in:YES,NO',
            'passport_holder' => 'required|in:YES,NO',
            'old_passport_number' => 'required_if:passport_holder,YES',
            'old_passport_date_of_issue' => 'required_if:passport_holder,YES',
            'issuing_authority' => 'required_if:passport_holder,YES',
        ];


        return $rules;
    }
}
