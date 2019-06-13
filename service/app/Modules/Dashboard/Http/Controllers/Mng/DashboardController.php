<?php

namespace App\Modules\Dashboard\Http\Controllers\Mng;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Dashboard\Http\Resources\DashboardPlan;
use App\Modules\Message\Repositories\MessageRepository;
use App\Modules\Project\Repositories\ProjectRepository;
use App\Modules\Maskname\Repositories\MaskNameRepository;
use App\Modules\Subscription\Repositories\PlanRepository;
use App\Modules\Dashboard\Http\Resources\DashboardOrganization;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Organization\Repositories\OrganizationRepository;

class DashboardController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Damnyan\Cmn\Services\ApiResponse
    */
    public function index()
    {
        $data = [
            'organizations' => OrganizationRepository::count(),
            'projects' => ProjectRepository::count(),
            'approved_mask_names' => MaskNameRepository::approved()->count(),
            'messages' => MessageRepository::sent()->count(),
        ];

        return (new ApiResponse)->resource($data);
    }
    
    public function plan()
    {
        $transactions = TransactionRepository::groupBy('plan_id')
            ->selectRaw('count(*) as count, plan_id, sum(amount) as total')
            ->get();
            
        return (new ApiResponse)->resource(new DashboardPlan($transactions));
    }

    public function message()
    {
        $transactions = MessageRepository::sent()->groupBy('organization_id')
            ->selectRaw('count(*) as count, organization_id')
            ->get();
            
        return (new ApiResponse)->resource(new DashboardOrganization($transactions));
    }
}
