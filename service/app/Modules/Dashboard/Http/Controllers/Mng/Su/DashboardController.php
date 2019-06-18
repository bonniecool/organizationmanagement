<?php

namespace App\Modules\Dashboard\Http\Controllers\Mng\Su;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Payment\Http\Resources\PaymentCollection;
use App\Modules\Organization\Repositories\OrganizationRepository;

class DashboardController extends Controller
{
    protected $apiResponse;

    protected $organization;

    protected $payment;

    protected $member;

    public function __construct(
        ApiResponse $apiResponse,
        OrganizationRepository $organization,
        MemberRepository $member,
        PaymentRepository $payment
    )
    {
        $this->apiResponse            = $apiResponse;
        $this->organizationRepository = $organization;
        $this->memberRepository       = $member;
        $this->paymentRepository       = $payment;
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

    public function recentSubscribers()
    {
        $payment = $this->paymentRepository
            ->orderBy('created_at', 'DESC')
            ->limit(5)
            ->get();
        return $this->apiResponse->resource(new PaymentCollection($payment));
    }

    public function revenuePerMonth()
    {
        $payment = $this->paymentRepository
            ->addSelect(DB::raw('DATE_FORMAT(created_at, "%m-%Y") as date'))
            ->addSelect(DB::raw('count(*) as count'))
            ->addSelect(DB::raw('sum(amount) as amount'))
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%m-%Y")'))
            ->get();
    
        $response['data'] = $payment;
        return $this->apiResponse->resource($response);
    }
}
