<?php

namespace App\Modules\User\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Auth extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'token' => $this['token'],
            'profile_type' => $this['user']->profile_type,
        ];
    }
}
