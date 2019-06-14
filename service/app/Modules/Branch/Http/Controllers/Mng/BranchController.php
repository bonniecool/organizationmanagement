<?php

namespace App\Modules\Branch\Http\Controllers\Mng;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Branch\Http\Resources\Branch;
use App\Modules\Branch\Repositories\BranchRepository;
use App\Modules\Branch\Http\Requests\Mng\BranchRequest;
use App\Modules\Branch\Http\Resources\BranchCollection;

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
}
