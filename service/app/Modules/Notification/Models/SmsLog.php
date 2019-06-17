<?php

namespace App\Modules\Notification\Models;

use OwenIt\Auditing\Auditable;
use App\Modules\User\Repositories\UserRepository;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Notification\Repositories\ReminderRepository;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class SmsLog extends Model implements AuditableContract
{
    use Auditable;

    protected $resourceName = 'Reminder';

    protected $table = 'sms_logs';

    public $timestamps = true;

    protected $fillable = [
        'reminder_id',
        'recipient_id',
        'recipient_name',
        'content',
        'date_time',
        'sms_rate'
    ];

    protected $hidden = [];

    protected $date = [];

    /**
     * Branch
     *
     * @return string
     */
    public function reminder()
    {
        return $this->belongsTo(ReminderRepository::class, 'reminder_id', 'id');
    }

    /**
     * Creator
     *
     * @return string
     */
    public function recipient()
    {
        return $this->belongsTo(MemberRepository::class, 'recipient_id');
    }
}
