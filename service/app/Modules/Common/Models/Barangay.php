<?php

namespace App\Modules\Common\Models;

use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;

class Barangay extends Model
{
    use CreatorUpdaterTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'barangays';

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
        'pivot'
    ];

    public function region()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Region::class);
    }

    public function province()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Province::class);
    }

    public function municipality()
    {
        return $this->belongsTo(\App\Modules\Common\Models\Municipality::class);
    }
}
