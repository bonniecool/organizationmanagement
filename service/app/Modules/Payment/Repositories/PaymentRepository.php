<?php

namespace App\Modules\Payment\Repositories;

use App\Modules\Payment\Models\Payment;

class PaymentRepository extends Payment
{
    public static function createPayment($data)
    {
        $organization = request()->user()->organization;

        return $organization->payments()->create([
            'status' => 'D',
            'txnid' => $data['txnid'],
            'payment_channel' => 'MPAY',
            'amount' => $data['amount'],
            'remarks' => 'WAITING FOR PAYMENT'
        ]);
    }

    public function scopeFilter($query, $params)
    {
        if (isset($params['refno'])) {
            $query = $query->where('refno', $params['refno']);
        }
        if (isset($params['date_from'])) {
            $query = $query->where('date', '>=', $params['date_from']);
        }
        if (isset($params['date_to'])) {
            $query = $query->orWhere('date', '<=', $params['date_to']);
        }
        if (isset($params['status'])) {
            $query = $query->where('status', $params['status']);
        }
        if (isset($params['uuid'])) {
            $query = $query->whereHas('organization', function($querySub) use($params){
                return $querySub->where('uuid', $params['uuid']);
            });
        }
        return $query;
    }
}
