<?php

namespace App\Modules\User\Http\Resources\Profile;

use App\Modules\User\Http\Resources\Profile\SiteUser;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class SiteUserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return SiteUser::collection($this->collection);
    }
}
