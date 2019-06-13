<?php

namespace App\Modules\Transaction\Models;

use App\Modules\Service\Repositories\QuestionaireRepository;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Transaction\Traits\TransactionLogTrait;
use App\Modules\User\Repositories\AdministratorRepository;
use App\Modules\User\Repositories\SiteUserRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class TransactionTicket extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes, TransactionLogTrait;

    protected $resourceName = 'Transaction Ticket';

    protected $table = 'transaction_tickets';

    public $timestamps = true;

    protected $fillable = [
        'profile_site_user_id',
        'service_id',
        'stage_id',
        'ticket_origin',
        'processor_id',
        'status',
        'remarks',
    ];

    protected $with = ['ticketOrigin', 'stage'];

    /**
     * Tickets Relationship
     *
     * @return string
     */
    public function transaction()
    {
        return $this->hasOne(TransactionRepository::class, 'id', 'transaction_id');
    }

    /**
     * Customer or Profile Relationship
     *
     * @return string
     */
    public function profile()
    {
        return $this->belongsTo(SiteUserRepository::class, 'profile_site_user_id');
    }

    /**
     * Customer or Profile Relationship
     *
     * @return string
     */
    public function questionaire()
    {
        return $this->belongsTo(QuestionaireRepository::class, 'questionaire_id');
    }

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
     * Stage Relationship
     *
     * @return string
     */
    public function stage()
    {
        return $this->belongsTo(StageRepository::class, 'stage_id');
    }

    /**
     * Stage Relationship
     *
     * @return string
     */
    public function processor()
    {
        return $this->hasOne(AdministratorRepository::class, 'id');
    }

    /**
     * Transaction Ticket Parent Relationship
     *
     * @return string
     * @description move backward
     */
    public function ticketOrigin()
    {
        return $this->belongsTo(self::class, 'ticket_origin');
    }

    /**
     * Transaction Ticket child Relationship
     *
     * @return string
      * @description move forward
     */
    public function ticketRecipient()
    {
        return $this->hasOne(self::class, 'ticket_origin');
    }

}