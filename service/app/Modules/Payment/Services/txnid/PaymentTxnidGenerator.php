<?php

namespace App\Modules\Payment\Services\Txnid;

use App\Modules\Payment\Models\Payment;
use Carbon\Carbon;

class PaymentTxnidGenerator
{
    public static function generate()
    {
        $count = Payment::where('txnid', 'LIKE', Carbon::now()->format('Ymd').'%')->count();
        do {
            $txnid = self::generateTemporaryTxnid($count);
        } while (self::doesTransactionNumberExists($txnid));
        return $txnid;
    }

    private static function generateTemporaryTxnid($count)
    {
        $code = self::generateCode($count);
        return $code;
    }

    private static function generateCode($count)
    {
        $series = str_pad($count++, 6,0, STR_PAD_LEFT);
        return Carbon::now()->format('Ymd').'-'.$series;
    }

    private static function doesTransactionNumberExists($txnid)
    {
        return Payment::where('txnid', $txnid)->exists();
    }
}
