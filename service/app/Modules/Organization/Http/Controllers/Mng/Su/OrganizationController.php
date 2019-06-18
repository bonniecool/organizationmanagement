<?php

namespace App\Modules\Organization\Http\Controllers\Mng\Su;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Organization\Http\Resources\Organization;
use App\Modules\Organization\Http\Requests\OrganizationRequest;
use App\Modules\Organization\Repositories\OrganizationRepository;
use App\Modules\Organization\Http\Resources\OrganizationCollection;

class OrganizationController extends Controller
{

    protected $organization;

    protected $apiResponse;

    /**
     * BranchController constructor.
     * 
     * @param organizationRepository $branch [branch repo]
     */
    public function __construct(
        OrganizationRepository $organization,
        ApiResponse $apiResponse
    )
    {
        $this->organizationRepository = $organization;
        $this->apiResponse            = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index()
    {
        $organizations = $this->organizationRepository->getOrPaginate();

        return $this->apiResponse->resource(new OrganizationCollection($organizations));
    }

    /**
     * Display a details of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show($organizationId)
    {
        $organization = $this->organizationRepository->findOrFail($organizationId);

        return $this->apiResponse->resource(new Organization($organization));
    }

    /**
     * update of organization.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function update(OrganizationRequest $request, $organizationId)
    {
        $payload = $request->only(config('module_branch.request.update'));

        $organization = $this->organizationRepository->findOrFail($organizationId);

        $organization->update($payload);

        $response['data'] = $organization->fresh();
        $response['message'] = 'Successfully updated organization.';
        return $this->apiResponse->resource(new Organization($response));
    }

    /**
     * delete of organization.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function delete($organizationId)
    {
        $this->organizationRepository->findOrFail($organizationId)->delete();

        $response['message'] = 'Succesfully deleted organization';
        return $this->apiResponse->resource($response);
    }
}