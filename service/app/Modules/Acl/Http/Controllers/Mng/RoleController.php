<?php

namespace App\Modules\Acl\Http\Controllers\Mng;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Acl\Http\Resources\RoleCollection;
use App\Modules\Acl\Http\Requests\Mng\CreateRoleRequest;
use App\Modules\Acl\Http\Requests\Mng\UpdateRoleRequest;
use App\Modules\Acl\Http\Resources\Role as RoleResource;
use App\Modules\Acl\Repositories\RoleRepository as Role;
use App\Modules\Acl\Http\Requests\Mng\SyncPermissionRequest;
use App\Modules\Acl\Http\Requests\Mng\AttachPermissionRequest;
use App\Modules\Acl\Http\Requests\Mng\DetachPermissionRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function index()
    {
        $roles = Role::getOrPaginate();

        return (new ApiResponse)->resource(new RoleCollection($roles));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Modules\Acl\Http\Requests\Mng\CreateRoleRequest  $request
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function store(CreateRoleRequest $request)
    {
        $data = $request->only('name');

        $role = Role::create($data);

        return (new ApiResponse)->resource(
            (new RoleResource($role))->additional([
                'message' => $role->getResourceName().' successfully created.'
            ])
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function show($roleId)
    {
        $role = Role::findOrFail($roleId);

        return (new ApiResponse)->resource(new RoleResource($role));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\Acl\Http\Requests\Mng\UpdateRoleRequest  $request
     * @param  int  $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function update(UpdateRoleRequest $request, $roleId)
    {
        $data = $request->only('name');

        $role = Role::findOrFail($roleId);

        $role->update($data);

        return (new ApiResponse)->resource(
            (new RoleResource($role))->additional([
                'message' => $role->getResourceName().' successfully updated.'
            ])
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function destroy($roleId)
    {
        $role = Role::findOrFail($roleId);
        $role->delete();

        return (new ApiResponse)->responseOK($role->getResourceName().' successfully deleted.');
    }

    /**
     * Attach permissions to a Role
     *
     * @param \App\Modules\Acl\Http\Requests\Mng\AttachPermissionRequest $request
     * @param int $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function attachPermission(AttachPermissionRequest $request, $roleId)
    {
        $data = $request->only('acl_permission_code');

        $role = Role::findOrFail($roleId);

        $attach = $role->permissions()
            ->attach($data['acl_permission_code']);

        if ($attach) {
            return (new ApiResponse)->badRequest('Failed to attach permission/s.');
        }

        return (new ApiResponse)->responseOK('Successfully attached permission/s to Role.');
    }

    /**
     * Detach permissions to a Role
     *
     * @param \App\Modules\Acl\Http\Requests\Mng\DetachPermissionRequest $request
     * @param int $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function detachPermission(DetachPermissionRequest $request, $roleId)
    {
        $data = $request->only('acl_permission_code');

        $role = Role::findOrFail($roleId);

        $role->permissions()
            ->detach($data['acl_permission_code']);

        return (new ApiResponse)->responseOK('Successfully detached permission/s to Role.');
    }

    /**
     * Sync permissions to a Role
     *
     * @param \App\Modules\Acl\Http\Requests\Mng\SyncPermissionRequest $request
     * @param int $roleId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function syncPermission(SyncPermissionRequest $request, $roleId)
    {
        $data = $request->only('acl_permission_code');

        $role = Role::findOrFail($roleId);

        $role->permissions()->sync($data['acl_permission_code']);

        return (new ApiResponse)->responseOK('Successfully synced permission/s to Role.');
    }
}
