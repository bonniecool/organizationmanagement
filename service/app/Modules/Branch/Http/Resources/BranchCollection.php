<?php

namespace App\Modules\Branch\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class BranchCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Branch::collection($this->collection);
    }
}
