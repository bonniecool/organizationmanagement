<?php

namespace App\Modules\Acl\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;

class ModuleGroup extends Model
{
    protected $resourceName = 'Module Group';

    protected $table = 'acl_module_groups';

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    public function modules()
    {
        return $this->hasMany(Module::class, 'acl_module_group_code', 'code');
    }

    public static function scopeProfileType($query, $profile)
    {
        return $query->whereRaw("find_in_set('$profile',profile_type)");
    }
}
