<?php

namespace App\Modules\Service\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;

class StageRequest extends ApiRequest
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
                    'subject' => 'required',
                    'body' => 'required',
                    'signature' => '',
                    'description' => '',
                    'group_id' => 'required|exists:groups,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'name' => 'required',
                    'description' => 'required',
                    'subject' => 'required',
                    'body' => 'required',
                    'signature' => '',
                    'description' => '',
                    'group_id' => 'required|exists:groups,id'
                ];
            }

            default:break;
        }
    }
}
