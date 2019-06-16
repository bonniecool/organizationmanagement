<?php

namespace App\Modules\Organization\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Organization\Http\Requests\OrganizationRequest;
use App\Modules\Organization\Repositories\OrganizationRepository;

class RegisterOrganizationController extends Controller
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
    public function register(OrganizationRequest $request)
    {
        $payload = $request->only(config('module_organization.request.create'));

        $organization = $this->organizationRepository->create($payload);

        $response['data'] = $organization;
        $response['message'] = 'Successfully registered your organization.';
        return $this->apiResponse->resource($response);
    }
}