<?php

namespace App\Modules\Acl\Http\Controllers\Ste;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Acl\Http\Resources\ModuleGroupCollection;
use App\Modules\Acl\Http\Resources\ModuleGroup as ModuleGroupResource;
use App\Modules\Acl\Repositories\ModuleGroupRepository as ModuleGroup;

class ModuleGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index()
    {
        // $type = request()->user()->profile_type;
        $type = config('module_user.constants.user_types.siteuser');
        $moduleGroups = ModuleGroup::profileType($type)->getOrPaginate();

        return (new ApiResponse)->resource(new ModuleGroupCollection($moduleGroups));
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $moduleGroupCode
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show($moduleGroupCode)
    {
        // $type = request()->user()->profile_type;
        $type = config('module_user.constants.user_types.siteuser');
        $moduleGroup = ModuleGroup::profileType($type)->findOrFail($moduleGroupCode);

        return (new ApiResponse)->resource(new ModuleGroupResource($moduleGroup));
    }
}
