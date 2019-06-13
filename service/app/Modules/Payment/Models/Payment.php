<?php

namespace App\Modules\Payment\Models;

use App\Modules\Transaction\Repositories\TransactionRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Payment extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Payment';

    protected $table = 'payments';

    public $timestamps = true;

    protected $fillable = [
        'appointment_id',
        'delivery_type',
        'refno',
        'txnid',
        'transaction_date',
        'payment_channel',
        'amount',
        'status',
        'remarks'
    ];

    /**
     * trans Relationship
     *
     * @return string
     */
    public function transaction() //pending
    {
//        return $this->belongsTo(TransactionRepository::class, 'txnid', 'txnid');
    }
}