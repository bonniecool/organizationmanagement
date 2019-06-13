<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Support\Facades\Validator;

class CreateDependencyEmergencyInformationRequest extends ApiRequest
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
            'emergency_contact_person' => [
                'required',
                'regex:/^[\p{L} ]+$/u'
            ],
            'emergency_contact_number' => 'required'
        ];


        return $rules;
    }
}
