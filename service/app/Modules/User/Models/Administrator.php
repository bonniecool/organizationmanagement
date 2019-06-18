<?php

namespace App\Modules\User\Models;

use OwenIt\Auditing\Auditable;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Administrator extends Model implements AuditableContract
{
    use Auditable;

    protected $resourceName = 'Administrator';

    protected $table = 'profile_administrators';

    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'mobile_number',
        'photo',
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
     * Group Relationship
     *
     * @return string
     */
    public function group()
    {
        return $this->belongsTo('App\Modules\Group\Repositories\GroupRepository', 'group_id', 'id');
    }
}
