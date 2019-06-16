<?php

namespace App\Modules\Payment\Models;

use App\Modules\Organization\Repositories\OrganizationRepository;
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
        'organisation_id',
        'organisation_uuid',
        'refno',
        'txnid',
        'transaction_date',
        'payment_channel',
        'amount',
        'status',
        'digest',
        'remarks'
    ];

    /**
     * Organization Relation
     */
    public function organization()
    {
        return $this->belongsTo(OrganizationRepository::class, 'organization_id');
    }
}