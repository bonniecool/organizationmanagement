<?php

namespace App\Modules\User\Http\Resources;

use App\Modules\User\Http\Resources\User;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return User::collection($this->collection);
    }
}
