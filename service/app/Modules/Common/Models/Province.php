<?php

namespace App\Modules\Common\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;

class Province extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'provinces';

    /**
     * The primary key used by the model.
     *
     * @var string
     */
    protected $primaryKey = 'code';

    /**
     * The "type" of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Enables the timestamp in the model
     *
     * @var string
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        //
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        //
    ];

    public function region()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Region::class);
    }

    public function municipalities()
    {
        return $this->hasMany(\App\Modules\Common\Models\Municipality::class);
    }

    public function barangays()
    {
        return $this->hasMany(\App\Modules\Common\Models\Barangay::class);
    }

    public function scopeFilterRegion($query, $filters)
    {
        if (isset($filters['region_code'])) {
            $query = $query->where('provinces.region_code', $filters['region_code']);
        }

        return $query;
    }
}
