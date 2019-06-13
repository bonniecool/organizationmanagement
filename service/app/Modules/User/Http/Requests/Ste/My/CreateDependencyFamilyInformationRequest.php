<?php

namespace App\Modules\User\Http\Requests\Ste\My;

use Damnyan\Cmn\Abstracts\ApiRequest;

class CreateDependencyFamilyInformationRequest extends ApiRequest
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
            'father_first_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'father_middle_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'father_last_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'father_country_citizenship' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'mother_first_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'mother_maiden_middle_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'mother_last_name' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
            'mother_country_citizenship' => [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ],
        ];

        return self::getAdditionalRules($rules);
    }

    private static function getAdditionalRules($rules)
    {
        if (in_array(
            request()->user()->profile->civil_status,
            ['MARRIED', 'WIDOWED', 'ANNULLED', 'SEPARATED']
        )
        ) {
            $rules['spouse_first_name'] = [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ];
            $rules['spouse_middle_name'] = [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ];
            $rules['spouse_last_name'] = [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ];
            $rules['spouse_country_citizenship'] = [
                'required',
                'regex:/^[\p{L} ]+$/u',
            ];
        }

        return $rules;
    }
}
