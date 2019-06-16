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
        $load = optional($organization->loadWallet)->amount ?? 0;
        if($load >= $members)
        {
            return true;
        }
        return false;
    }
}
