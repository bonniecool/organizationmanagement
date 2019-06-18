<?php

namespace App\Modules\Branch\Http\Requests\Mng;

use Damnyan\Cmn\Abstracts\ApiRequest;

class BranchRequest extends ApiRequest
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
            'name' => 'required|unique:organization_branches',
            'region_code' => 'required',
            'province_code' => 'required',
            'municipality_code' => 'required',
            'barangay_code' => 'required',
            'zip_code' => 'required',
            'street' => 'required',
            'longitude' => '',
            'latitude' => '',
            'is_active' => '',
        ];
    }
}
