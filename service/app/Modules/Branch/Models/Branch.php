<?php

namespace App\Modules\Branch\Models;

use OwenIt\Auditing\Auditable;
use Emadadly\LaravelUuid\Uuids;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
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
}
