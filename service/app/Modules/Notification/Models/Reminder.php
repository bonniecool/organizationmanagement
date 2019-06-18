<?php

namespace App\Modules\Notification\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Modules\User\Repositories\UserRepository;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Notification\Repositories\SmsLogRepository;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Reminder extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes, Notifiable;

    protected $resourceName = 'Reminder';

    protected $table = 'reminders';

    public $timestamps = true;

    protected $fillable = [
        'branch_id',
        'subject',
        'content',
        'status',
        'image',
        'has_expiration',
        'expiration_date'
    ];

    protected $hidden = [
        'deleted_at'
    ];

    protected $date = [
        'expiration_date'
    ];

    /**
     * Branch
     *
     * @return string
     */
    public function branch()
    {
        return $this->belongsTo(BranchRepository::class, 'branch_id');
    }

    /**
     * Creator
     *
     * @return string
     */
    public function creator()
    {
        return $this->belongsTo(UserRepository::class, 'created_by');
    }

    /**
     * Updator
     *
     * @return string
     */
    public function updator()
    {
        return $this->belongsTo(UserRepository::class, 'updated_by');
    }

    /**
     * sms logs
     *
     * @return string
     */
    public function smsLogs()
    {
        return $this->hasMany(SmsLogRepository::class, 'reminder_id', 'id');
    }


}
