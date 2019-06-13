<?php

namespace App\Modules\Service\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;

class ServicePackageRequest extends ApiRequest
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
        switch($this->method())
        {
            case 'GET':
                {
                    return [];
                }
            case 'DELETE':
                {
                    return [];
                }
            case 'POST':
                {
                    return [
                        'name' => 'required',
                        'description' => 'required',
                        'price' => 'required'
                    ];
                }
            case 'PUT':
                {
                    return [
                        'name' => 'required',
                        'description' => 'required',
                        'price' => 'required'
                    ];
                }

            default:break;
        }
    }
}
