<?php

namespace App\Modules\Branch\Models;


use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Notification\Repositories\ReminderRepository;
use OwenIt\Auditing\Auditable;
use Emadadly\LaravelUuid\Uuids;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use App\Modules\Common\Repositories\RegionRepository;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Common\Repositories\BarangayRepository;
use App\Modules\Common\Repositories\ProvinceRepository;
use App\Modules\Common\Repositories\MunicipalityRepository;
use App\Modules\Notification\Repositories\ReminderRepository;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use App\Modules\Member\Repositories\MemberAttendanceRepository;
use App\Modules\User\Repositories\BranchAdministratorRepository;

class branch extends Model implements AuditableContract
{
    use Auditable, uuids;

    protected $resourceName = 'Organization Branch';

    protected $table = 'organization_branches';

    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'name',
        'region_code',
        'province_code',
        'municipality_code',
        'barangay_code',
        'zip_code',
        'street',
        'longitude',
        'latitude',
        'is_active'
    ];

    /**
     * Set UUID
     *
     * @return string
     */
    public function setUuidAttribute($value)
    {
        $value = substr($value,0,8);

        $uuid = "BRC".strtoupper($value);

        return $this->attributes['uuid'] = $uuid;
    }

     /**
     * organization Relationship
     *
     * @return string
     */
    public function organization()
    {
        return $this->belongsTo(OrganizationRepository::class, 'organization_id', 'id');
    }

     /**
     * branch administrator profile Relationship
     *
     * @return string
     */
    public function profile()
    {
        return $this->hasMany(BranchAdministratorRepository::class, 'branch_id');
    }

     /**
     * branch administrator profile Relationship
     *
     * @return string
     */
    public function members()
    {
        return $this->hasMany(MemberRepository::class, 'branch_id');
    }

    /**
     * Region Relationship
     *
     * @return string
     */
    public function region()
    {
       return $this->belongsTo(RegionRepository::class, 'region_code', 'code');
    }

    /**
     * Province Relationship
     *
     * @return string
     */
    public function province()
    {
       return $this->belongsTo(ProvinceRepository::class, 'province_code', 'code');
    }

    /**
     * Municipality Relationship
     *
     * @return string
     */
    public function municipality()
    {
       return $this->belongsTo(MunicipalityRepository::class, 'municipality_code', 'code');
    }

    /**
     * Barangay Relationship
     *
     * @return string
     */
    public function barangay()
    {
       return $this->belongsTo(BarangayRepository::class, 'barangay_code', 'code');
    }

    /**
     * Attendance list relationship
     * 
     * @return string
     */
    public function attendance()
    {
        return $this->hasMany(MemberAttendanceRepository::class, 'branch_id');
    }

    /**
     * Reminder list relationship
     *
     * @return string
     */
    public function reminders()
    {
        return $this->hasMany(ReminderRepository::class, 'branch_id');
    }
}
