<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository as SiteUser;
use App\Modules\User\Http\Resources\DependencyPersonalInformationResource;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyPersonalInformationRequest;
use App\Modules\User\Http\Requests\Ste\My\UpdateDependencyPersonalInformationRequest;

class DependencyPersonalInformationController extends Controller
{

    protected $siteUser;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param SiteUser    $siteUser    description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        SiteUser $siteUser,
        ApiResponse $apiResponse
    ) {
        $this->siteUser    = $siteUser;
        $this->apiResponse = $apiResponse;
    }

    /**
     * create dependency
     *
     * @param CreateDependencyPersonalInformationRequest $request description
     * @return void
     */
    public function store(CreateDependencyPersonalInformationRequest $request)
    {
        $data = $request->only(
            config('module_user.request.dependency.create.personal_information')
        );

        $data['parent_id'] = request()->user()->profile->id;

        $dependency = $this->siteUser->create($data);

        return $this->apiResponse->resource(
            (
                new DependencyPersonalInformationResource(
                    $dependency->load(
                        'country',
                        'municipality',
                        'region',
                        'barangay',
                        'province',
                        'birthRegion',
                        'birthProvince',
                        'birthMunicipality'
                    )
                )
            )->additional(
                [
                'message' => 'Dependency successfully registered.'
                ]
            )
        );
    }

    /**
     * update dependency
     *
     * @param UpdateDependencyPersonalInformationRequest $request    description
     * @param string                                     $siteUserId description
     * @return void
     */
    public function update(
        UpdateDependencyPersonalInformationRequest $request, $siteUserId
    ) {
        $data = $request->only(
            config('module_user.request.dependency.update.personal_information')
        );

        $dependency = $this->siteUser->whereId($siteUserId)
            ->whereParentId(request()->user()->profile->id)
            ->firstOrFail();

        $dependency->update($data);

        return $this->apiResponse->resource(
            (
                new DependencyPersonalInformationResource(
                    $dependency
                )
                )->additional(
                    [
                        'message' => 'Dependency successfully updated.'
                    ]
                )
        );
    }
}
