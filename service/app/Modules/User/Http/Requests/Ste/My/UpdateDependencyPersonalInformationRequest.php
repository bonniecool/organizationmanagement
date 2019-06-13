<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Support\Facades\Validator;

class UpdateDependencyPersonalInformationRequest extends ApiRequest
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
            'parent_id' => '',
            'photo' => 'required',
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required',
            'suffix' => 'max:5',
            'birth_date' => 'required|before:today',
            'gender' => 'required',
            'civil_status' => 'required',
            'birth_legitimacy' => 'required',
            'birth_country' => 'required',
            'birth_region_code' => 'required_if:birth_country,PH,Philippines',
            'birth_province_code' => 'required_if:birth_country,PH,Philippines',
            'birth_municipality_code' => 'required_if:birth_country,PH,Philippines',
            'telephone_number' => 'required',
            'mobile_number' => 'required',
            'basis_of_philippine_citizenship' => 'required',

            'traveling_companion_name' => 'present|validate_minor:birth_date,18',
            'traveling_companion_relationship' => 'present|validate_minor:birth_date,18',
            'traveling_companion_contact_number' => 'present|validate_minor:birth_date,18',

            // 'spouse_first_name' => 'required_if:civil_status,MARRIED,WIDOWED,ANNULLED,SEPARATED',
            // 'spouse_middle_name' => 'required_if:civil_status,MARRIED,WIDOWED,ANNULLED,SEPARATED',
            // 'spouse_last_name' => 'required_if:civil_status,MARRIED,WIDOWED,ANNULLED,SEPARATED',
            // 'spouse_country_citizenship' => 'required_if:civil_status,MARRIED,WIDOWED,ANNULLED,SEPARATED',

            // 'region_code' => 'required',
            // 'province_code' => 'required',
            // 'municipality_code' => 'required',
            'barangay_code' => '',
            'postal_code' => '',
            // 'street' => 'required',
            'emergency_contact_person' => 'required',
            'emergency_contact_number' => 'required',
            'occupation' => '',
            'office_number' => '',
            'office_address' => '',
        ];


        return $rules;
    }
}
