<?php

namespace App\Modules\Transaction\Traits;

use App\Modules\Transaction\Repositories\TransactionLogRepository;

trait TransactionLogTrait
{
    public static function bootTransactionLogTrait()
    {
        static::updated(function($model){
            TransactionLogRepository::log($model);
        });
    }
}