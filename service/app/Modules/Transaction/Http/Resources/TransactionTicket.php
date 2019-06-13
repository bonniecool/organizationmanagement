<?php

namespace App\Modules\Transaction\Http\Resources;

use App\Modules\Transaction\Http\Resources\Transaction as TransactionResource;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class TransactionTicket extends Resource
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
            'stage_name' => $this->stage->name,
            'ticket_origin' => $this->ticket_origin,
            'processor_id' => $this->processor,
            'status' => $this->status,
            'remarks' => $this->remarks,
            'profile_site_user' => $this->profile,
            'transaction' => new TransactionResource($this->transaction),
        ];
    }
}

