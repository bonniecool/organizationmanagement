<?php

namespace App\Modules\Member\Http\Controllers\Mng\Brc;

use Illuminate\Http\Request;
use App\Modules\User\Models\User;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Resources\Profile\SiteUser;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\Profile\SiteUserCollection;

class MemberController extends Controller
{

    protected $member;

    protected $apiResponse;

    /**
     * MemberController constructor.
     * 
     * @param memberRepository $member [member repo]
     */
    public function __construct(
        SiteUserRepository $member,
        ApiResponse $apiResponse
    )
    {
        $this->memberRepository = $member;
        $this->apiResponse      = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request)
    {
        $members = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->getOrPaginate();

        return $this->apiResponse->resource(new SiteUserCollection($members));
    }

    /**
     * Display a details of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $memberId)
    {
        $member = $request
            ->user()
            ->profile
            ->branch
            ->members()
            ->findOrFail($memberId);

        return $this->apiResponse->resource(new SiteUser($member));
    }

    /**
     * creation of branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function store(BranchRequest $request)
    {
        $payload = $request->only(config('module_branch.request.mng.create'));

        $branch = $request
            ->user()
            ->organization
            ->branches()
            ->create($payload);

        $response['data'] = $branch;
        $response['message'] = 'Successfully created branch.';
        return $this->apiResponse->resource($response);
    }

    /**
     * update of branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function update(BranchRequest $request, $branchId)
    {
        $payload = $request->only(config('module_branch.request.mng.update'));

        $branch = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId);

        $branch->update($payload);

        $response['data'] = $branch->fresh();
        $response['message'] = 'Succesfully updated branch';
        return $this->apiResponse->resource($response);
    }

    /**
     * update of branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function delete(Request $request, $branchId)
    {
        $branch = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->delete();

        $response['message'] = 'Succesfully deleted branch';
        return $this->apiResponse->resource($response);
    }
}