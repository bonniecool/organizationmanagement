<?php

namespace App\Modules\Transaction\Models;

use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Service\Repositories\QuestionaireAnswerRepository;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Transaction\Repositories\TransactionItemRepository;
use App\Modules\Transaction\Repositories\TransactionLogRepository;
use App\Modules\Transaction\Repositories\TransactionTicketRepository;
use App\Modules\User\Repositories\SiteUserRepository;
use Carbon\Carbon;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Transaction extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Transaction';

    protected $table = 'transactions';

    public $timestamps = true;

    protected $fillable = [
        'txnid',
        'amount',
        'status',
        'is_editable',
        'remarks',
        'payment_gateway_type',
        'payment_gateway_ref_no',
        'payment_gateway_datetime',
        'digest'
    ];

    protected $with = ['stages'];

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
     * Tickets Relationship
     *
     * @return string
     */
    public function stages()
    {
        return $this->hasMany(TransactionTicketRepository::class, 'transaction_id');
    }

    /**
     * Customer or Profile Relatioprofile_idnship
     *
     * @return string
     */
    public function profile()
    {
        return $this->belongsTo(SiteUserRepository::class, 'profile_site_user_id');
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
     * Payment Relationship
     *
     * @return string
     */
    public function payment() //pending
    {
        return $this->belongsTo(PaymentRepository::class, 'txnid', 'txnid');
    }

    /**
     * QuestionaireAnswer Relationship
     *
     * @return string
     */
    public function questionaireAnswers()
    {
        return $this->hasMany(QuestionaireAnswerRepository::class, 'transaction_id');
    }

    /**
     * Transaction Log Relationship
     *
     * @return string
     */
    public function transactionLogs()
    {
        return $this->hasMany(TransactionLogRepository::class, 'transaction_id');
    }

    /**
     * Transaction Items Relationship
     *
     * @return string
     */
    public function transactionItems()
    {
        return $this->hasMany(TransactionItemRepository::class, 'transaction_id');
    }
}