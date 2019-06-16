<?php

namespace App\Modules\Acl\Http\Controllers\Ste;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Acl\Http\Resources\RoleCollection;
use App\Modules\Acl\Http\Requests\Mng\SyncRoleRequest;
use App\Modules\Acl\Http\Requests\Mng\AttachRoleRequest;
use App\Modules\Acl\Http\Requests\Mng\DetachRoleRequest;
use App\Modules\Acl\Http\Resources\Role as RoleResource;
use App\Modules\User\Repositories\UserRepository as User;

class UserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param string $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function index($userId)
    {
        $permissions = User::findOrFail($userId)
            ->roles()
            ->getOrPaginate();

        return (new ApiResponse)->resource(new RoleCollection($permissions));
    }

    /**
     * Attach role/s to a user
     *
     * @param  App\Modules\Acl\Http\Requests\Mng\AttachRoleRequest $request
     * @param  int $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function attach(AttachRoleRequest $request, $userId)
    {
        $data = $request->only('acl_role_id');

        $organization = request()->user()->organization;
        $user = $organization->users()->findOrFail($userId);

        $user->roles()
            ->attach($data['acl_role_id']);

        return (new ApiResponse)->responseOK('Successfully attached role/s to user.');
    }

    /**
     * Detach role/s to a user
     *
     * @param  App\Modules\Acl\Http\Requests\Mng\DetachRoleRequest $request
     * @param  int $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function detach(DetachRoleRequest $request, $userId)
    {
        $data = $request->only('acl_role_id');

        $organization = request()->user()->organization;
        $user = $organization->users()->findOrFail($userId);

        $user->roles()
            ->detach($data['acl_role_id']);

        return (new ApiResponse)->responseOK('Successfully detached role/s to user.');
    }

    /**
     * Sync role/s to a user
     *
     * @param  App\Modules\Acl\Http\Requests\Mng\SyncRoleRequest $request
     * @param  int $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function sync(SyncRoleRequest $request, $userId)
    {
        $data = $request->only('acl_role_id');

        $organization = request()->user()->organization;
        $user = $organization->users()->findOrFail($userId);

        $user->roles()
            ->sync($data['acl_role_id']);

        return (new ApiResponse)->responseOK('Successfully synced role/s to user.');
    }
}
