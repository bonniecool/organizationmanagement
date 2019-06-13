<?php

namespace App\Modules\Service\Models;

use App\Modules\Service\Repositories\EmailContentRepository;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Group\Repositories\GroupRepository;
use App\Modules\Transaction\Repositories\TransactionTicketRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Stage extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Stage';

    protected $table = 'stages';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'description',
        'for_payment',
        'order'
    ];

    /**
     * Service Relationship
     *
     * @return string
     */
    public function service()
    {
        return $this->belongsTo(ServiceRepository::class, 'service_id');
    }

    /**
     * Email content Relationship
     *
     * @return string
     */
    public function emailContent()
    {
        return $this->hasOne(EmailContentRepository::class, 'stage_id');
    }

    /**
     * Stage Group Relationship
     *
     * @return string
     */
    public function group()
    {
        return $this->belongsTo(GroupRepository::class, 'group_id');
    }

    public function transactionTickets()
    {
        return $this->hasMany(TransactionTicketRepository::class, 'stage_id');
    }
}
