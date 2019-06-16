<?php

namespace App\Modules\Wallet\Models;

use App\Modules\Wallet\Repositories\OrganizationRepository;
use Illuminate\Database\Eloquent\Model;

class LoadWallet extends Model
{
    protected $resourceName = 'Load Wallet';

    protected $table = 'load_wallets';

    public $timestamps = true;

    protected $fillable = [
        'amount'
    ];

    /**
     * User profile Relationship
     *
     * @return string
     */
    public function organization()
    {
        return $this->belongsTo(OrganizationRepository::class, 'organization_id');
    }
}
