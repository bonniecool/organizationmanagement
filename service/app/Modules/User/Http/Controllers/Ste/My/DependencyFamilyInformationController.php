<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\DependencyFamilyInformationResource;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyFamilyInformationRequest;

class DependencyFamilyInformationController extends Controller
{


    public function store(CreateDependencyFamilyInformationRequest $request, $siteUserId)
    {
        $data = $request->only(config('module_user.request.dependency.create.family_information'));

        $dependency = SiteUserRepository::whereId($siteUserId)
            ->whereParentId(request()->user()->profile->id)
            ->firstOrFail();

        $dependency->update($data);

        return (new ApiResponse)->resource(
            (new DependencyFamilyInformationResource($dependency))->additional([
                'message' => 'Family Information successfully registered.'
            ])
        );
    }
}
