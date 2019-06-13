<?php

namespace App\Modules\Service\Traits;

trait PivotOrderTrait
{
    public static function bootPivotOrderTrait()
    {
        static::created(function($model){
            dd($this);
//            $original = $model->getOriginal();
//            $data = $model->toArray();
//            $payload = [
//                'payment_id' => $model->id,
//                'amount' => $model->amount,
//                'transaction_type' => 'CREDIT'
//            ];
//            $wallet = WalletRepository::createWallet($model->customer);
//            $wallet->walletLogs()->create($payload);
        });

        static::updated(function($model){
            dd($this);
//            $original = $model->getOriginal();
//            $data = $model->toArray();
//            $payload = [
//                'payment_id' => $model->id,
//                'amount' => $model->amount,
//                'transaction_type' => 'DEBIT'
//            ];
//            $wallet = WalletRepository::createWallet($model->customer);
//            if( $model->status == 'S' )
//            {
//                $wallet->walletLogs()->create($payload);
//            }
//            if( $model->status == 'V' )
//            {
//                WalletLogRepository::rollback($model);
//            }
        });
    }
}