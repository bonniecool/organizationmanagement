<?php

namespace App\Modules\Organization\Models;

use App\Modules\User\Repositories\UserRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Organization extends Model
{
    protected $resourceName = 'Organization';

    protected $table = 'organizations';

    public $timestamps = true;

    protected $fillable = [
        'name'
    ];

    /**
     * User profile Relationship
     *
     * @return string
     */
    public function profile()
    {
//        return $this->hasMany(UserRepository::class, 'organization_id');
    }

}
