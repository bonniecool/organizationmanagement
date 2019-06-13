<?php

namespace App\Modules\Service\Http\Resources;

use App\Modules\Group\Http\Resources\Group;
use Illuminate\Http\Resources\Json\Resource;

class Stage extends Resource
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
            'order' => $this->order,
            'name' => $this->name,
            'group'  => new Group($this->group),
            'description' => $this->description,
            'for_payment' => $this->for_payment,
            'email_content' => $this->emailContent
        ];
    }
}