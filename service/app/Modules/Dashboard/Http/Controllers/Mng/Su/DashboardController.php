<?php

namespace App\Modules\Dashboard\Http\Controllers\Mng\Su;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Organization\Repositories\OrganizationRepository;

class DashboardController extends Controller
{
    protected $apiResponse;

    protected $organization;

    protected $member;

    public function __construct(
        ApiResponse $apiResponse,
        OrganizationRepository $organization,
        MemberRepository $member
    )
    {
        $this->apiResponse            = $apiResponse;
        $this->organizationRepository = $organization;
        $this->memberRepository       = $member;
    }

    public function totalOrganization()
    {
        $organization = $this->organizationRepository->count();

        $response['data'] = ['total' => $organization];
        return $this->apiResponse->resource($response);
    }

    public function memberPerOrganization()
    {
        $memberCount = $this->organizationRepository
            ->leftJoin('organization_branches', 'organization_branches.organization_id', '=', 'organizations.id')
            ->leftJoin('profile_branch_members', 'profile_branch_members.branch_id', '=', 'organization_branches.id')
            ->addSelect(DB::raw('organizations.name'))
            ->addSelect(DB::raw('count(profile_branch_members.id) as member_count'))
            ->groupBy(DB::raw('organizations.name'))
            ->get();

        $response['data'] = $memberCount;
        return $this->apiResponse->resource($response);
    }

    public function OrganizationPerType()
    {
        $organizationCount = $this->organizationRepository
            ->addSelect(DB::raw('type'))
            ->addSelect(DB::raw('count(type) as org_count'))
            ->groupBy(DB::raw('type'))
            ->get();

        $response['data'] = $organizationCount;
        return $this->apiResponse->resource($response);
    }
}
