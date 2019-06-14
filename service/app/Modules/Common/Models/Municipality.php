<?php

namespace App\Modules\Common\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;

class Municipality extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'municipalities';

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

    protected $guarded = [
        'id'
    ];

    public function region()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Region::class);
    }

    public function province()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Province::class);
    }

    public function barangays()
    {
        return $this->hasMany(\App\Modules\Common\Models\Barangay::class);
    }

    public function scopeFilterProvince($query, $filters)
    {
        if (isset($filters['province_code'])) {
            $query = $query->where('municipalities.province_code', $filters['province_code']);
        }

        return $query;
    }
}
