<?php

namespace App\Modules\Acl\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use App\Modules\Organization\Repositories\OrganizationRepository;

class Role extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Role';

    protected $table = 'acl_roles';

    protected $fillable = [
        'name'
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'acl_permission_role', 'acl_role_id', 'acl_permission_code')
            ->withTimestamps();
    }

    public function organization()
    {
        return $this->belongsTo(OrganizationRepository::Class, 'organization_id');
    }
}
