<?php

namespace App\Modules\Notification\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class SmsLogCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return SmsLog::collection($this->collection);
    }
}
