<?php

namespace App\Modules\Member\Models;

use OwenIt\Auditing\Auditable;
use Emadadly\LaravelUuid\Uuids;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class MemberAttendance extends Model implements AuditableContract
{
    use Auditable, uuids;

    protected $resourceName = 'Branch Member Attendance';

    protected $table = 'branch_member_attendance';

    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'branch_id',
        'member_id',
        'attendance_date'
    ];
}
