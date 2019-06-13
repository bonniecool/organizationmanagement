<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\DependencyPassportInformationResource;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyPassportInformationRequest;

class DependencyPassportInformationController extends Controller
{


    public function store(CreateDependencyPassportInformationRequest $request, $siteUserId)
    {
        $data = $request->only(config('module_user.request.dependency.create.passport_information'));

        $dependency = SiteUserRepository::whereId($siteUserId)
            ->whereParentId(request()->user()->profile->id)
            ->firstOrFail();

        $dependency->update($data);

        return (new ApiResponse)->resource(
            (new DependencyPassportInformationResource($dependency))->additional([
                'message' => 'Passport Information successfully registered.'
            ])
        );
    }
}
