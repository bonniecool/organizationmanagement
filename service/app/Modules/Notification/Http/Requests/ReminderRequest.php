<?php

namespace App\Modules\Notification\Http\Requests;

use Damnyan\Cmn\Abstracts\ApiRequest;

class ReminderRequest extends ApiRequest
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
            'subject' => 'required',
            'content' => 'required',
            'status' => 'required|in:1,0',
            'has_expiration' => '',
            'expiration_date' => ''
        ];
    }
}
