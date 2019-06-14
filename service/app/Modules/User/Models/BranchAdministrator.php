<?php

namespace App\Modules\User\Models;

use App\Modules\Branch\Repositories\BranchRepository;
use Emadadly\LaravelUuid\Uuids;
use OwenIt\Auditing\Auditable;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class BranchAdministrator extends Model implements AuditableContract
{
    use Auditable, uuids;

    protected $resourceName = 'Branch Administrator';

    protected $table = 'profile_branch_administrators';

    public $timestamps = false;

    protected $fillable = [
        'uuid',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'mobile_number',
        'photo'
    ];

    /**
     * User Relationship
     *
     * @return string
     */
    public function user()
    {
        return $this->morphOne('App\Modules\User\Repositories\UserRepository', 'profile');
    }

    /**
     * Mutator for First name
     *
     * @return string
     */
    public function getFirstNameAttribute()
    {
        return $this->attributes['first_name'] = mb_strtoupper($this->attributes['first_name']);
    }

    /**
     * Mutator for Middle name
     *
     * @return string
     */
    public function getMiddleNameAttribute()
    {
        return $this->attributes['middle_name'] = mb_strtoupper($this->attributes['middle_name']);
    }

    /**
     * Mutator for Last name
     *
     * @return string
     */
    public function getLastNameAttribute()
    {
        return $this->attributes['last_name'] = mb_strtoupper($this->attributes['last_name']);
    }

    /**
     * Accessor for fullname
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        $profile = $this;

        $fullname = $profile->first_name.' ';

        if ($profile->middle_name) {
            $fullname .= $profile->middle_name.' ';
        }

        $fullname .= $profile->last_name;

        if ($profile->qualifier) {
            $fullname .= ' '.$profile->qualifier;
        }

        return $fullname;
    }

    /**
     * Relationship branch
     *
     * @return string
     */
    public function branch()
    {
        return $this->belongsTo(BranchRepository::class, 'branch_id');
    }
}
