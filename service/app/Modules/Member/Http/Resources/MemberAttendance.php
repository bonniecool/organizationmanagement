<?php

namespace App\Modules\Member\Http\Resources;

use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class MemberAttendance extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'uuid' => $this->uuid,
            'date' => Carbon::parse($this->attendance_date)->format('Y-m-d'),
            'time' => Carbon::parse($this->attendance_date)->format('H:i:s A'),
            'date_readable' => $this->attendance_date->diffForHumans(),
            'member' => new Member($this->member)
        ];
    }
}
