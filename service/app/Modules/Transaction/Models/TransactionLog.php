<?php

namespace App\Modules\Transaction\Models;

use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\User\Repositories\UserRepository;
use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class TransactionLog extends Model
{
    use CreatorUpdaterTrait;

    protected $resourceName = 'Transaction Log';

    protected $table = 'transaction_logs';

    public $timestamps = true;

    protected $fillable = [
        'stage_id',
        'transaction_id',
        'action',
        'remarks',
        'created_by'
    ];

    protected $with = [];

    public function getCreatedAtReadableAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('F d, Y h:i:sa');
    }

    public function getCreatedAgoAttribute()
    {
        return Carbon::createFromTimeStamp(strtotime($this->attributes['created_at']))->diffForHumans();
    }

    public function transaction()
    {
        return $this->belongsTo(TransactionRepository::class, 'transaction_id');
    }

    public function stage()
    {
        return $this->belongsTo(StageRepository::class, 'stage_id');
    }

    public function processor()
    {
        return $this->hasOne(UserRepository::class, 'id', 'created_by');
    }
}