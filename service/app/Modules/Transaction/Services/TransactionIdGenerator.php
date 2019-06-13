<?php

namespace App\Modules\Transaction\Services;

use App\Modules\Transaction\Models\Transaction;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Carbon\Carbon;

class TransactionIdGenerator
{
    public static function generate()
    {
        do {
            $txnid = self::generateTemporaryTxnid();
        } while (self::doesTransactionNumberExists($txnid));
        return $txnid;
    }

    private static function generateTemporaryTxnid($len = 24)
    {
        $hex = md5(time() . uniqid("", true));
        $pack = pack('H*', $hex);
        $tmp =  base64_encode($pack);
        $uid = preg_replace("#(*UTF8)[^A-Za-z0-9]#", "", $tmp);
        $len = max(4, min(128, $len));
        while (strlen($uid) < $len) {
            $uid .= uniqid();
        }
        $code = strtoupper(substr($uid, 0, $len));
        return $code;
    }

    private static function doesTransactionNumberExists($txnid)
    {
        return TransactionRepository::where('txnid', $txnid)->exists();
    }
}
