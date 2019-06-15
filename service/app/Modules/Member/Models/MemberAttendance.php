<?php

namespace App\Modules\Member\Models;

use App\Modules\Member\Repositories\MemberRepository;
use OwenIt\Auditing\Auditable;
use Emadadly\LaravelUuid\Uuids;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class MemberAttendance extends Model implements AuditableContract
{
    use Auditable;

    protected $resourceName = 'Branch Member Attendance';

    protected $table = 'branch_member_attendance';

    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'branch_id',
        'attendance_date'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'attendance_date',
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    public function member()
    {
        return $this->belongsTo(MemberRepository::class, 'uuid', 'uuid');
    }
}
