<?php

namespace App\Modules\Transaction\Models;

use App\Modules\Service\Repositories\ServicePackageRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Carbon\Carbon;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class TransactionItem extends Model implements AuditableContract
{
    use Auditable, SoftDeletes;

    protected $resourceName = 'Transaction Item';

    protected $table = 'transaction_items';

    public $timestamps = true;

    protected $fillable = [
        'transaction_id',
        'package_id'
    ];

    public function getCreatedAtReadableAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('F d, Y h:i:sa');
    }

    public function getCreatedAgoAttribute()
    {
        return Carbon::createFromTimeStamp(strtotime($this->attributes['created_at']))->diffForHumans();
    }

    public function getUpdatedAtReadableAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('F d, Y h:i:sa');
    }

    public function getUpdatedAgoAttribute()
    {
        return Carbon::createFromTimeStamp(strtotime($this->attributes['updated_at']))->diffForHumans();
    }

    /**
     * Transaction Relationship
     *
     * @return string
     */
    public function transaction()
    {
        return $this->belongsTo(TransactionRepository::class, 'transaction_id');
    }

    /**
     * Service Package Relationship
     *
     * @return string
     */
    public function servicePackage()
    {
        return $this->hasOne(ServicePackageRepository::class, 'transaction_id');
    }


}