<?php

namespace App\Modules\Notification\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class SmsLog extends Resource
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
            'reminder' => $this->reminder,
            'recipient' => $this->recipient,
            'date_time' => $this->date_time,
            'sms_rate' => $this->sms_rate
        ];
    }
}
