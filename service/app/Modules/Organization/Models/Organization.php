<?php

namespace App\Modules\Organization\Models;

use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Wallet\Repositories\LoadWalletRepository;
use Illuminate\Database\Eloquent\Model;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\Branch\Repositories\BranchRepository;

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
        return $this->hasMany(UserRepository::class, 'organization_id');
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

    /**
     * Payments or Transactions Relationship
     *
     * @return string
     */
    public function payments()
    {
       return $this->hasMany(PaymentRepository::class, 'organization_id');
    }

    /**
     * Load wallet Relationship
     *
     * @return string
     */
    public function loadWallet()
    {
        return $this->hasOne(LoadWalletRepository::class, 'organization_id');
    }



}
