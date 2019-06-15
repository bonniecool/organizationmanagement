<?php

namespace App\Modules\Member\Models;

use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Common\Models\Barangay;
use App\Modules\Common\Models\Municipality;
use App\Modules\Common\Models\Province;
use App\Modules\Common\Models\Region;
use App\Modules\Member\Repositories\MemberAttendanceRepository;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use Emadadly\LaravelUuid\Uuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Auditable;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Member extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes, Uuids;

    protected $resourceName = 'Member';

    protected $table = 'profile_branch_members';

    public $timestamps = true;

    protected $fillable = [
        'branch_id',
        'uuid',
        'pin',
        'first_name',
        'middle_name',
        'last_name',
        'gender',
        'birth_date',
        'suffix',
        'mobile_number',
        'user_type',
        'photo',
        'region_code',
        'province_code',
        'municipality_code',
        'barangay_code',
        'zip_code',
        'street',
        'longitude',
        'latitude',
        'has_logged',
        'mac_address'
    ];

    protected $hidden = [
        'pin'
    ];

    /**
     * Set UUID
     *
     * @return string
     */
    public function setUuidAttribute($value)
    {
        $value = substr($value,0,8);

        $uuid = "MEM".strtoupper($value);

        return $this->attributes['uuid'] = $uuid;
    }

    /**
     * Mutator for First name
     *
     * @return string
     */
    public function getFirstNameAttribute($value)
    {
        return $this->attributes['first_name'] = mb_strtoupper($value);
    }

    /**
     * Mutator for Middle name
     *
     * @return string
     */
    public function getMiddleNameAttribute($value)
    {
        return $this->attributes['middle_name'] = mb_strtoupper($value);
    }

    /**
     * Mutator for Last name
     *
     * @return string
     */
    public function getLastNameAttribute($value)
    {
        return $this->attributes['last_name'] = mb_strtoupper($value);
    }

    /**
     * Accessor for fullname
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        $profile = $this;

        $fullname = $profile->first_name.' ';

        if ($profile->middle_name) {
            $fullname .= $profile->middle_name.' ';
        }

        $fullname .= $profile->last_name;

        if ($profile->qualifier) {
            $fullname .= ' '.$profile->qualifier;
        }

        return $fullname;
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_code', 'code');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_code', 'code');
    }

    public function municipality()
    {
        return $this->belongsTo(Municipality::class, 'municipality_code', 'code');
    }

    public function barangay()
    {
        return $this->belongsTo(Barangay::class, 'barangay_code', 'code');
    }

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
     * attendances
     *
     * @return string
     */
    public function attendances()
    {
        return $this->hasMany(MemberAttendanceRepository::class, 'uuid', 'uuid');
    }

}
