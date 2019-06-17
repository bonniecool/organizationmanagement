<?php

namespace App\Modules\Dashboard\Http\Controllers\Mng;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Member\Repositories\MemberRepository;

class DashboardController extends Controller
{
    protected $apiResponse;

    protected $branch;

    protected $member;

    public function __construct(
        ApiResponse $apiResponse,
        BranchRepository $branch,
        MemberRepository $member
    )
    {
        $this->apiResponse      = $apiResponse;
        $this->branchRepository = $branch;
        $this->memberRepository = $member;
    }

    public function totalBranches(Request $request)
    {
        $branches = $request->user()->organization->branches()->count();

        $response['data'] = ['total' => $branches];
        return $this->apiResponse->resource($response);
    }

    public function memberPerBranch(Request $request)
    {
        $memberCount = $request
            ->user()
            ->organization
            ->branches()
            ->leftJoin('profile_branch_members', 'profile_branch_members.branch_id', '=', 'organization_branches.id')
            ->addSelect(DB::raw('organization_branches.name'))
            ->addSelect(DB::raw('count(profile_branch_members.id) as member_count'))
            ->groupBy(DB::raw('organization_branches.name'))
            ->get();

        $response['data'] = $memberCount;
        return $this->apiResponse->resource($response);
    }

    public function activeInactiveBranch(Request $request)
    {
        $active = $request
            ->user()
            ->organization
            ->branches()
            ->where('is_active', 1)
            ->count();

        $inactive = $request
            ->user()
            ->organization
            ->branches()
            ->where('is_active', 1)
            ->count();

        $response['data'] = ['active' => $active, 'inactive' => $inactive];
        return $this->apiResponse->resource($response);
    }
}
