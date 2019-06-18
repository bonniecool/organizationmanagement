<?php

namespace App\Modules\Notification\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Reminder extends Resource
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
            'id' => $this->id,
            'branch_id' => $this->branch_id,
            'subject' => $this->subject,
            'content' => $this->content,
            'status' => $this->status,
            'image' => $this->image,
            'has_expiration' => $this->has_expiration,
            'expiration_date' => $this->expiration_date,
            'posted_by' => $this->creator->profile->full_name,
            'posted_at' => !is_null($this->created_at) ? $this->created_at->diffForHumans() : null,
//            'expires_on' => $this->expiration_date->diffForHumans()
        ];
    }
}
