<?php

namespace App\Modules\User\Http\Requests\Ste;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\ApiRequest;

class UpdateSiteUserRequest extends ApiRequest
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
            'password' => 'required|confirmed',
            'first_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u'
            ],
            'middle_name' => 'regex:/^[\p{L} ]+$/u',
            'last_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u'
            ],
            'birth_date' => 'required|before:today',
            'gender' => 'required|in:MALE,FEMALE',
//            'civil_status' => 'required',
//            'birth_legitimacy' => 'required',
//            'birth_country' => 'required',
//            'birth_region_code' => 'required_if:birth_country,PH,Philippines',
//            'birth_province_code' => 'required_if:birth_country,Philippines',
//            'birth_municipality_code' => 'required_if:birth_country,Philippines',
//            'telephone_number' => 'required',
            'mobile_number' => 'required',

//            'passport_holder' => 'required|in:YES,NO',

            'father_first_name' => 'required',
            'father_middle_name' => 'required',
            'father_last_name' => 'required',
            'father_country_citizenship' => 'required',

            'mother_first_name' => 'required',
            'mother_maiden_middle_name' => 'required',
            'mother_maiden_last_name' => 'required',
            'mother_country_citizenship' => 'required',

            'basis_of_philippine_citizenship' => 'required',

            'emergency_contact_person' => 'required',
            'emergency_contact_number' => 'required',
            'foreign_passport_holder' => 'required',
            'photo' => 'required|url',

            'region_code' => 'required',
            'province_code' => 'required',
            'municipality_code' => 'required',
            'barangay_code' => '',
            'postal_code' => 'required'
        ];
        return self::getAdditionalRules($rules);
    }
    private function getAdditionalRules($rules)
    {
        if(in_array(request()->input('civil_status'),['MARRIED', 'WIDOWED', 'ANNULLED', 'SEPARATED']))
        {
            $rules['spouse_first_name'] = 'required';
            $rules['spouse_middle_name'] = 'required';
            $rules['spouse_last_name'] = 'required';
            $rules['spouse_country_citizenship'] = 'required';
        }

        $age = Carbon::now()->format('Y') -
            Carbon::parse(request()->input('birth_date'))->format('Y');

        if($age < 18)
        {
            $rules['traveling_companion_name'] = 'required';
            $rules['traveling_companion_relationship'] = 'required';
            $rules['traveling_companion_contact_number'] = 'required';
        }

        if(request()->input('passport_holder') == 'YES')
        {
            $rules['old_passport_number'] = 'required';
            $rules['old_passport_date_of_issue'] = 'required';
            $rules['issuing_authority'] = 'required';
        }

        return $rules;
    }
}
