<?php

namespace App\Modules\Acl\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;

class Permission extends Model
{
    protected $resourceName = 'Permission';

    protected $table = 'acl_permissions';

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $timestamps = false;

    public function module()
    {
        return $this->belongsTo(Module::class, 'acl_module_code', 'code');
    }
}
