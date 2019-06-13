<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\DependencyContactInformationResource;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyContactInformationRequest;

class DependencyContactInformationController extends Controller
{


    public function store(CreateDependencyContactInformationRequest $request, $siteUserId)
    {
        $data = $request->only(config('module_user.request.dependency.create.contact_information'));

        $dependency = SiteUserRepository::whereId($siteUserId)
            ->whereParentId(request()->user()->profile->id)
            ->firstOrFail();

        $dependency->update($data);

        return (new ApiResponse)->resource(
            (new DependencyContactInformationResource($dependency))->additional([
                'message' => 'Contact Information successfully registered.'
            ])
        );
    }
}
