<?php

namespace App\Modules\Acl\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;

class Module extends Model
{
    protected $resourceName = 'Module';

    protected $table = 'acl_modules';

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    public function moduleGroup()
    {
        return $this->belongsTo(ModuleGroup::class, 'acl_module_group_code', 'code');
    }

    public function permissions()
    {
        return $this->hasMany(Permission::class, 'acl_module_code', 'code');
    }
}
