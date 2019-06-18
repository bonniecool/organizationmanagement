<?php

namespace App\Modules\Member\Repositories;

use Carbon\Carbon;
use App\Modules\Member\Models\MemberAttendance;

class MemberAttendanceRepository extends MemberAttendance
{
    public function scopeFilter($query, $filters)
    {
        $dateFilter = Carbon::now();
        $dateFilter = date_format($dateFilter, 'Y-m-d');

        if (isset($filters['attendance_date']) && !is_null($filters['attendance_date'])) {
           $dateFilter1 = strtotime($filters['attendance_date']);
           $dateFilter = date('Y-m-d',$dateFilter1);
           
        }

        $query = $query->where('attendance_date', 'LIKE', '%'.$dateFilter.'%');

        return $query;
    }
}
