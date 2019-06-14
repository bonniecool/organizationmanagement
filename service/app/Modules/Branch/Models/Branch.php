<?php

namespace App\Modules\Branch\Models;

use Emadadly\LaravelUuid\Uuids;
use OwenIt\Auditing\Auditable;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class branch extends Model implements AuditableContract
{
    use Auditable, uuids;

    protected $resourceName = 'Organization Branch';

    protected $table = 'organization_branches';

    public $timestamps = false;

    protected $fillable = [
        // 'organization_id',
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
}
