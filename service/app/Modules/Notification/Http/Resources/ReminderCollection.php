<?php

namespace App\Modules\Notification\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class ReminderCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return Reminder::collection($this->collection);
    }
}
