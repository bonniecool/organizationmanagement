<?php

namespace App\Modules\User\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Modules\Acl\Traits\UserAclTrait;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\UserResolver;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Auth\Passwords\CanResetPassword;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use App\Modules\Wallet\Repositories\WalletRepository;
use App\Modules\User\Repositories\UserTokenRepository;
use App\Modules\Project\Repositories\ProjectRepository;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Organization\Repositories\OrganizationRepository;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements
    AuditableContract,
    AuthenticatableContract,

    JWTSubject,
    UserResolver
{
    use Auditable, Authenticatable,
    Notifiable, SoftDeletes, UserAclTrait;

    public $resourceName = 'User';

    protected $table = 'users';

    protected $fillable = [
        'email',
        'password',
        'completed_profile'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['full_name'];
    
     /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->profile->fullname;
    }

    public static function resolve()
    {
        return Auth::check() ? Auth::user()->getAuthIdentifier() : null;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Morph profile
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function profile()
    {
        return $this->morphTo();
    }

    /**
     * Administrator profile_type filter from users
     *
     * @param  \Illuminate\Database\Query\Builder $query
     *
     * @return \Illuminate\Database\Query\Builder
     */
    public function scopeAdministrators($query)
    {
        return $query->whereProfileType(
            config('module_user.constants.user_types.administrator')
        );
    }


    /**
     * Site user profile_type filter from users
     *
     * @param  \Illuminate\Database\Query\Builder $query
     *
     * @return \Illuminate\Database\Query\Builder
     */
    public static function scopeSiteUser($query)
    {
        return $query->whereProfileType(
            config('module_user.constants.user_types.siteuser')
        );
    }

    /**
     * Mutator for password attribute
     *
     * @param mixed $value
     *
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * Check if user is not an Administrator
     *
     * @return boolean
     */
    public function isNotAdmin()
    {
        return $this->profile_type != config('module_user.constants.user_types.administrator');
    }

    /**
     * Check if user is an Administrator
     *
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->profile_type == config('module_user.constants.user_types.administrator');
    }

    /**
     * Organization Relationship
     *
     * @return string
     */
    public function organization()
    {
        return $this->belongsTo(OrganizationRepository::class, 'organization_id');
    }

    /**
     * Tokens hasMany relationship
     *
     * @return boolean
     */
    public function tokens()
    {
        return $this->hasMany(UserTokenRepository::class, 'user_id');
    }

}
