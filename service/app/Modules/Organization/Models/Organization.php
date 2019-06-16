<?php

namespace App\Modules\Organization\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Model;
use Emadadly\LaravelUuid\Uuids;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\Branch\Repositories\BranchRepository;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Organization extends Model
{
    use Uuids;

    protected $resourceName = 'Organization';

    protected $table = 'organizations';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'organization_owner',
        'mobile_number',
        'region_code',
        'province_code',
        'municipality_code',
        'barangay_code',

    ];

    /**
     * Set UUID
     *
     * @return string
     */
    public function setUuidAttribute($value)
    {
        $value = substr($value,0,8);

        $uuid = "ORG".strtoupper($value);

        return $this->attributes['uuid'] = $uuid;
    }

    /**
     * User profile Relationship
     *
     * @return string
     */
    public function profile()
    {
        return $this->hasMany(UserRepository::class, 'organization_id');
    }

    /**
     * Branch Relationship
     *
     * @return string
     */
    public function branches()
    {
       return $this->hasMany(BranchRepository::class, 'organization_id');
    }

}
