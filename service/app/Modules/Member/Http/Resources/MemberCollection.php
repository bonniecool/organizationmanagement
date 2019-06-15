<?php

namespace App\Modules\Member\Http\Resources;

use App\Modules\Member\Http\Resources\MemberAttendance;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class MemberCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return MemberAttendance::collection($this->collection);
    }
}
