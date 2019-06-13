<?php

namespace App\Modules\User\Models;

use Damnyan\Cmn\Abstracts\AbstractModel;
use App\Modules\User\Repositories\UserRepository;

class UserToken extends AbstractModel
{
    /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'user_tokens';

    /**
    * The resource name used by the model.
    *
    * @var string
    */
    protected $resourceName = 'User Token';

    /**
    * The primary key used by the model.
    *
    * @var string
    */
    protected $primaryKey = 'id';

    /**
    * The "type" of the auto-incrementing ID.
    *
    * @var string
    */
    protected $keyType = 'integer';

    /**
    * Enables the timestamp in the model
    *
    * @var string
    */
    public $timestamps = true;

    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'email',
        'token',
        'token_type',
        'account_type',
        'expiration_date'
    ];

    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var array
    */
    protected $hidden = [
        'deleted_at'
    ];

    /**
    * The attributes that should be mutated to dates.
    *
    * @var array
    */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(UserRepository::class, 'user_id');
    }
}
