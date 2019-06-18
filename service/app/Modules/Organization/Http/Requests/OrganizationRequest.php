<?php

namespace App\Modules\Organization\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class OrganizationRequest extends ApiRequest
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
            'uuid' => '',
            'name' => 'required',
            'organzation_owner' => 'required',
            'mobile_number' => 'required',
            'region_code' => 'required',
            'province_code' => 'required',
            'municipality_code' => 'required',
            'barangay_code' => 'required',
            'zip_code' => 'required',
            'street' => 'required',
        ];
    }
}
