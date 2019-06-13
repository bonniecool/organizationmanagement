<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 09/03/2018
 * Time: 2:34 PM
 */

namespace App\Modules\User\Http\Requests\Mng;

use Damnyan\Cmn\Abstracts\ApiRequest;

class ChangeAdministratorStatusRequest extends ApiRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'status' => 'required|in:1,0'
        ];
    }
}
