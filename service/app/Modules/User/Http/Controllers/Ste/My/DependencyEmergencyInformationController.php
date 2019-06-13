<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\DependencyEmergencyInformationResource;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyEmergencyInformationRequest;

class DependencyEmergencyInformationController extends Controller
{


    public function store(CreateDependencyEmergencyInformationRequest $request, $siteUserId)
    {
        $data = $request->only(config('module_user.request.dependency.create.emergency_information'));

        $dependency = SiteUserRepository::whereId($siteUserId)
            ->whereParentId(request()->user()->profile->id)
            ->firstOrFail();

        $dependency->update($data);

        return (new ApiResponse)->resource(
            (new DependencyEmergencyInformationResource($dependency))->additional([
                'message' => 'Emergency Information successfully registered.'
            ])
        );
    }
}
