<?php

namespace App\Modules\Payment\Repositories;

use App\Modules\Payment\Models\Payment;

class PaymentRepository extends Payment
{
    public static function createPayment($paymentData, $data)
    {
        $organization = request()->user()->organization;

        return $organization->payments()->create([
            'status' => 'P',
            'refno' => $paymentData['refno'],
            'txnid' => $paymentData['txnid'],
            'payment_channel' => 'MPAY',
            'amount' => $data['amount'],
            'remarks' => 'WAITING FOR PAYMENT'
        ]);
    }
}
