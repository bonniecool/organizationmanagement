<?php

namespace App\Modules\Acl\Http\Controllers\Ste;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Acl\Http\Resources\ModuleCollection;
use App\Modules\Acl\Http\Resources\Module as ModuleResource;
use App\Modules\Acl\Repositories\ModuleRepository as Module;
use App\Modules\Acl\Repositories\ModuleGroupRepository as ModuleGroup;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param string $moduleGroupCode
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index($moduleGroupCode)
    {
        // $type = request()->user()->profile_type;
        $type = config('module_user.constants.user_types.siteuser');
        $modules = ModuleGroup::profileType($type)->findOrFail($moduleGroupCode)
            ->modules()
            ->getOrPaginate();

        return (new ApiResponse)->resource(new ModuleCollection($modules));
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $moduleGroupCode
     * @param  string  $moduleCode
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show($moduleGroupCode, $moduleCode)
    {
        // $type = request()->user()->profile_type;
        $type = config('module_user.constants.user_types.siteuser');
        $module = ModuleGroup::profileType($type)->findOrFail($moduleGroupCode)
            ->modules()
            ->findOrFail($moduleCode);

        return (new ApiResponse)->resource(new ModuleResource($module));
    }
}
