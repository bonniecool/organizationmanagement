<?php

namespace App\Modules\Group\Http\Requests\Mng\Su;

use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Http\Request;

class GroupRequest extends ApiRequest
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
                        'name' => 'required|unique:groups,name',
                        'description' => 'required',
                        'attach_profile_id' => 'array',
                        'attach_profile_id.*' => 'distinct'
                    ];
                }
            case 'PUT':
                {
                    $id = $request->groupId;
                    return [
                        'name' => 'required|unique:groups,name,' . $id . ',id',
                        'description' => 'required',
                        'attach_profile_id' => 'array',
                        'attach_profile_id.*' => 'distinct'
                    ];
                }
            default:
                break;
        }
    }
}