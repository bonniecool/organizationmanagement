<?php

namespace App\Modules\Organization\Models;

use OwenIt\Auditing\Auditable;
use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Wallet\Repositories\LoadWalletRepository;
use Illuminate\Database\Eloquent\Model;
use Emadadly\LaravelUuid\Uuids;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Common\Repositories\RegionRepository;
use App\Modules\Common\Repositories\BarangayRepository;
use App\Modules\Common\Repositories\ProvinceRepository;
use App\Modules\Common\Repositories\MunicipalityRepository;
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
        'photo',
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
     * Payments or Transactions Relationship
     *
     * @return string
     */
    public function payments()
    {
       return $this->hasMany(PaymentRepository::class, 'organization_id');
    }

    /**
     * Load wallet Relationship
     *
     * @return string
     */
    public function loadWallet()
    {
        return $this->hasOne(LoadWalletRepository::class, 'organization_id');
    }

}
