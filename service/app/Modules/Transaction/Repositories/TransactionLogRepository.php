<?php

namespace App\Modules\Transaction\Repositories;

use App\Modules\Transaction\Models\TransactionLog;

class TransactionLogRepository extends TransactionLog
{
    public static function log(&$model)
    {
        $data = [
            'transaction_id' => $model->transaction_id,
            'stage_id' => $model->stage_id,
            'action' => $model->status,
            'remarks' => $model->remarks,
            'created_by' => $model->updated_by,
        ];
        self::create($data);
    }
}
