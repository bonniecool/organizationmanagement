<?php

namespace App\Modules\Service\Models;

use App\Modules\Service\Repositories\QuestionaireRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\User\Repositories\SiteUserRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class QuestionaireAnswer extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Questionaire Answer';

    protected $table = 'questionaire_answers';

    public $timestamps = true;

    protected $fillable = [
        'questionaire_id',
        'answer'
    ];

    protected $with = ['transaction'];
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
     * Profile Relationship
     *
     * @return string
     */
    public function profile()
    {
        return $this->belongsTo(SiteUserRepository::class, 'profile_site_user_id');
    }

    /**
     * Questionaire Relationship
     *
     * @return string
     */
    public function questionaire()
    {
        return $this->belongsTo(QuestionaireRepository::class, 'questionaire_id');
    }
}