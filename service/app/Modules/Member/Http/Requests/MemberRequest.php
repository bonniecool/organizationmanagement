<?php

namespace App\Modules\Member\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class MemberRequest extends ApiRequest
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
            'branch_id' => '',
            'uuid' => '',
            'pin' => '',
            'first_name' => 'required',
            'middle_name' => '',
            'last_name' => 'required',
            'gender' => 'required|in:MALE,FEMALE',
            'birth_date' => 'required|date',
            'suffix' => '',
            'mobile_number' => 'required',
            'user_type' => '',
            'photo' => '',
            'region_code' => '',
            'province_code' => '',
            'municipality_code' => '',
            'barangay_code' => '',
            'zip_code' => '',
            'street' => '',
            'longitude' => '',
            'latitude' => '',
            'has_logged' => '',
            'mac_address' => '',
        ];
    }
}
