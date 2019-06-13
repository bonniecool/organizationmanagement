<?php

namespace App\Modules\Service\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;

class QuestionaireRequest extends ApiRequest
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
                        'field' => 'required|unique:questionaires,field',
                        'is_required' => 'required',
                        'label' => 'required',
                        'type' => 'required',
                        'question' => 'required',
                        'option' => 'array'
                    ];
                }
            case 'PUT':
                {
                    return [
                        'field' => 'required|unique:questionaires,field',
                        'is_required' => 'required',
                        'label' => 'required',
                        'type' => 'required',
                        'question' => 'required',
                        'option' => 'array'
                    ];
                }

            default:break;
        }
    }
}
