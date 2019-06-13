<?php

namespace App\Modules\Organization\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\Model;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\Branch\Repositories\BranchRepository;
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
