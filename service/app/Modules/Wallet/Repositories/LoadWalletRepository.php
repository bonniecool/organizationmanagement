<?php

namespace App\Modules\Wallet\Repositories;

use App\Modules\Wallet\Models\LoadWallet;

class LoadWalletRepository extends LoadWallet
{
    /**
     * create profile
     *
     * @param array $data description
     * @return void
     */
    public static function createOrganization($data)
    {
        $data['name'] = isset($data['organization_name']) ?? $data['organization_name'];
        return self::create($data);
    }
}
