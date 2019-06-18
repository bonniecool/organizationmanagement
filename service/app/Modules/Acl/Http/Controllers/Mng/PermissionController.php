<?php

namespace App\Modules\Acl\Http\Controllers\Mng;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Acl\Http\Resources\PermissionCollection;
use App\Modules\Acl\Http\Resources\Permission as PermissionResource;
use App\Modules\Acl\Repositories\ModuleGroupRepository as ModuleGroup;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param string $moduleGroupCode
     * @param string $moduleCode
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index($moduleGroupCode, $moduleCode)
    {
        $permissions = ModuleGroup::findOrFail($moduleGroupCode)
            ->modules()
            ->findOrFail($moduleCode)
            ->permissions()
            ->getOrPaginate();

        return (new ApiResponse)->resource(new PermissionCollection($permissions));
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $moduleGroupCode
     * @param  string  $moduleCode
     * @param  string  $permissionCode
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show($moduleGroupCode, $moduleCode, $permissionCode)
    {
        $permission = ModuleGroup::findOrFail($moduleGroupCode)
            ->modules()
            ->findOrFail($moduleCode)
            ->permissions()
            ->findOrFail($permissionCode);

        return (new ApiResponse)->resource(new PermissionResource($permission));
    }
}
