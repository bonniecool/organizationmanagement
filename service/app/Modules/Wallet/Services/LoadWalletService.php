<?php

namespace App\Modules\Wallet\Services;

use App\Modules\Branch\Repositories\BranchRepository;
use Carbon\Carbon;

class LoadWalletService
{
    protected $branch;

    public function __construct(BranchRepository $branch)
    {
        $this->branch = $branch;
    }

    public function checkLoadWallet($organization, $branch)
    {
        $members = $this->branch->find($branch)->count();
        $amount = $members * 0.50;
        $load = optional($organization->loadWallet)->amount ?? 0;
        if($load >= $amount)
        {
            $wallet = $organization->loadWallet;
            $wallet->amount = $wallet->amount - $amount;
            $wallet->save();
            return true;
        }
        return false;
    }
}
