<?php

namespace App\Modules\User\Http\Controllers\Mng;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Resources\UserCollection;
use App\Modules\User\Http\Resources\User as UserResource;
use App\Modules\User\Repositories\UserRepository as User;
use App\Modules\User\Http\Requests\Mng\CreateAdministratorRequest;
use App\Modules\User\Http\Requests\Mng\UpdateAdministratorRequest;
use App\Modules\User\Http\Requests\Mng\ChangeAdministratorStatusRequest;
use App\Modules\User\Repositories\AdministratorRepository as Administrator;

class AdministratorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function index()
    {
        $users = User::administrators()
            ->getOrPaginate();

        return (new ApiResponse)->resource(new UserCollection($users));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Modules\User\Http\Requests\Mng\CreateAdministratorRequest  $request
     *
     * @return  \Damnyan\Cmn\Services\ApiResponse
     */
    public function store(CreateAdministratorRequest $request)
    {
        $data = $request->only(config('module_user.request.administrator.create'));

        $user = Administrator::createProfile($data);

        return (new ApiResponse)->resource(
            (new UserResource($user))->additional([
                'message' => 'Administrator profile successfully created.'
            ])
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $userId
     *
     * @return  \Damnyan\Cmn\Services\ApiResponse
     */
    public function show($userId)
    {
        $user = User::administrators()
            ->findOrFail($userId);

        return (new ApiResponse)->resource(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\User\Http\Requests\Mng\UpdateAdministratorRequest  $request
     * @param  int                                                             $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function update(UpdateAdministratorRequest $request, $userId)
    {
        $data = $request->only(config('module_user.request.administrator.update'));

        $user = User::administrators()
            ->findOrFail($userId);

        $user->profile->updateProfile($data);

        return (new ApiResponse)->resource(
            (new UserResource($user))->additional([
                'message' => 'Administrator profile successfully updated.'
            ])
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function destroy($userId)
    {
        $user = User::administrators()
            ->findOrFail($userId);

        $user->delete();

        return (new ApiResponse)->responseOK('Administrator profile successfully deleted.');
    }

    /**
     * Reset the password of specified user.
     *
     * @param  int  $userId
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function resetPassword($userId)
    {
        $user = User::administrators()
            ->findOrFail($userId);

        $user->createNewPassword();

        return (new ApiResponse)->responseOK('New password sent to '.$user->email);
    }
}
