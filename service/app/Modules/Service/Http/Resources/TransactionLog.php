<?php

namespace App\Modules\Service\Http\Resources;

use App\Modules\Group\Http\Resources\Group;
use App\Modules\User\Http\Resources\User;
use Illuminate\Http\Resources\Json\Resource;

class TransactionLog extends Resource
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
            'action' => $this->action,
            'remarks' => $this->remarks,
            'processor' => $this->processor->profile->full_name,
            'updated_at_readable' => $this->created_at_readable,
            'updated_ago' => $this->created_ago,
        ];
    }
}