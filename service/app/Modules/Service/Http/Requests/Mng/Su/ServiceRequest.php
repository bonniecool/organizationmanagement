<?php

namespace App\Modules\Service\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Http\Request;

class ServiceRequest extends ApiRequest
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
    public function rules(Request $request)
    {
        switch ($this->method()) {
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
                        'name' => 'required|unique:services,name',
                        'description' => 'required'
                    ];
                }
            case 'PUT':
                {
                    $id = $request->id;
                    return [
                        'name' => 'required|unique:services,name,'.$id.',id',
                        'description' => 'required',
                        'is_active' => 'required|in:1,0'
                    ];
                }
            default:
                break;
        }
    }
}
