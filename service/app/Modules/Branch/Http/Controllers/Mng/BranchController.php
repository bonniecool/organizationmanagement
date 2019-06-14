<?php

namespace App\Modules\Branch\Http\Controllers\Mng;

use Illuminate\Http\Request;
use App\Modules\User\Models\User;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Branch\Http\Resources\Branch;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Branch\Http\Requests\Mng\BranchRequest;
use App\Modules\Branch\Http\Resources\BranchCollection;
use App\Modules\User\Http\Requests\Mng\CreateAdministratorRequest;
use App\Modules\User\Http\Requests\Mng\UpdateAdministratorRequest;

class BranchController extends Controller
{

    protected $branch;

    protected $apiResponse;

    /**
     * BranchController constructor.
     * 
     * @param branchRepository $branch [branch repo]
     */
    public function __construct(
        BranchRepository $branch,
        ApiResponse $apiResponse
    )
    {
        $this->branchRepository = $branch;
        $this->apiResponse      = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request)
    {
        $branches = $request
            ->user()
            ->organization
            ->branches()
            ->getOrPaginate();

        return $this->apiResponse->resource(new BranchCollection($branches));
    }

    /**
     * Display a details of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $branchId)
    {
        $branch = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId);

        return $this->apiResponse->resource(new Branch($branch));
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

    /**
     * branch admin list per branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function branchAdminList(Request $request, $branchId)
    {
        $users = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->profile()
            ->get()
            ->load('user');

        $response['data'] = $users;
        return $this->apiResponse->resource($response);
    }

    /**
     * create branch admin per branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function createBranchAdmin(CreateAdministratorRequest $request, $branchId)
    {
        $payload = $request->only(config('module_user.request.BranchAdministrator.create'));

        $organizationId = $request
            ->user()
            ->organization
            ->id;

        $profile = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->profile()
            ->create($payload);

        $payload['profile_id'] = $profile->id;
        $payload['organization_id'] = $organizationId;
        $payload['profile_type'] = 'BranchAdministrator';

        $user = User::create($payload);

        $response['profile'] = $profile;
        $response['user'] = $user;
        $response['message'] = 'Successfully created user for this branch.';
        return $this->apiResponse->resource($response);
    }

    /**
     * update branch admin per branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function updateBranchAdmin(UpdateAdministratorRequest $request, $branchId, $profileId)
    {
        $payload = $request->only(config('module_user.request.BranchAdministrator.update'));

        $profile = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->profile()
            ->findOrFail($profileId);

        $profile->update($payload);
    
        $response['data'] = $profile->fresh();
        $response['message'] = 'Successfully updated user for this branch.';
        return $this->apiResponse->resource($response);
    }

    /**
     * update branch admin per branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function branchAdminDetails(Request $request, $branchId, $profileId)
    {
        $profile = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->profile()
            ->findOrFail($profileId)
            ->load('user');
    
        $response['data'] = $profile;
        return $this->apiResponse->resource($response);
    }

    /**
     * delete branch admin per branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function deleteBranchAdmin(Request $request, $branchId, $profileId)
    {
        $profile = $request
            ->user()
            ->organization
            ->branches()
            ->findOrFail($branchId)
            ->profile()
            ->findOrFail($profileId)
            ->delete();

        $user = User::where('profile_id', $profileId)
            ->where('profile_type', 'BranchAdministrator')
            ->first()
            ->delete();
    
        $response['message'] = 'Successfully deleted branch admin.';
        return $this->apiResponse->resource($response);
    }
}