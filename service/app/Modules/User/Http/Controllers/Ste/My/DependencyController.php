<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\User\Http\Resources\DependencyCollection;
use App\Modules\User\Http\Resources\Dependency as DependencyResource;

class DependencyController extends Controller
{


    public function index()
    {
        $dependencies = SiteUserRepository::whereParentId(request()->user()->profile->id)
            ->getOrPaginate();

        return (new ApiResponse)->resource(
            (new DependencyCollection($dependencies))
        );
    }

    public function show($siteUserId)
    {
        $dependency = SiteUserRepository::whereParentId(request()->user()->profile->id)
            ->whereId($siteUserId)
            ->firstOrFail();

        return (new ApiResponse)->resource(
            (new DependencyResource($dependency))
        );
    }

    public function delete($siteUserId)
    {
        $dependency = SiteUserRepository::whereParentId(request()->user()->profile->id)
            ->whereId($siteUserId)
            ->firstOrFail()
            ->delete();

        return (new ApiResponse)->responseOK('Dependency successfully deleted.');
    }
}
