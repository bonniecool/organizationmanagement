<?php

namespace App\Modules\Group\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use App\Modules\Service\Repositories\StageRepository;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Group extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Group';

    protected $table = 'groups';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'description',
        'is_active'
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['code'] = str_slug($value);
        $this->attributes['name'] = $value;
    }
    /**
     * Administrator Relationship
     *
     * @return string
     */
    public function administrators()
    {
        return $this->hasMany('App\Modules\User\Repositories\AdministratorRepository', 'group_id');
    }

    /**
     * Stage Relationship
     *
     * @return string
     */
    public function stage()
    {
        return $this->hasOne(StageRepository::class, 'group_id');
    }
}