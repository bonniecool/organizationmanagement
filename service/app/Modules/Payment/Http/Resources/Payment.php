<?php

namespace App\Modules\Payment\Http\Resources;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Payment extends Resource
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
            'status' => config('module_payment.constants.status.'.$this->status),//self::parseStatus($this->status),
            'refno' => $this->refno,
            'txnid' => $this->txnid,
            'payment_channel' => $this->payment_channel,
            'amount' => $this->amount,
            'remarks' => $this->remarks,
            'organization_id' => $this->organization_id,
            'organization_name' => $this->organization->name,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'created_date_readable' => self::parseDate($this->created_at),
            'updated_date_readable' => self::parseDate($this->updated_at)
        ];
    }

    private static function parseDate($value)
    {
        return Carbon::parse($value)->format('F d, Y H:i:s A');
    }

    private static function parseStatus($value)
    {
        if($value === 'S')
        {
            return 'PAID';
        }

        return 'PENDING';
    }
}
