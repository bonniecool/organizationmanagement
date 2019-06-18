<?php

namespace App\Modules\Dashboard\Http\Controllers\Mng\Brc;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Member\Repositories\MemberRepository;

class DashboardController extends Controller
{
    protected $apiResponse;

    protected $member;

    public function __construct(
        ApiResponse $apiResponse,
        MemberRepository $member
    )
    {
        $this->apiResponse      = $apiResponse;
        $this->memberRepository = $member;
    }

    public function totalMembers(Request $request)
    {
        $members = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->count();

        $response['data'] = ['total' => $members];
        return $this->apiResponse->resource($response);
    }

    public function membersPerGender(Request $request)
    {
        $male = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->where('gender', 'MALE')
            ->count();

        $female = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->where('gender', 'FEMALE')
            ->count();

            $response['data'] = ['male' => $male, 'female' => $female];
        return $this->apiResponse->resource($response);
    }

    public function membersPerUserType(Request $request)
    {
        $member = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->where('user_type', 'member')
            ->count();

        $guest = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->where('user_type', 'guest')
            ->count();

        $response['data'] = ['member' => $member, 'guest' => $guest];
        return $this->apiResponse->resource($response);
    }

    public function newMember(Request $request)
    {
        $newMember = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->addSelect(DB::raw('DATE_FORMAT(created_at, "%m-%Y") as date'))
            ->addSelect(DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%m-%Y")'))
            ->get();

        $response['data'] = $newMember;
        return $this->apiResponse->resource($response);
    }
}
