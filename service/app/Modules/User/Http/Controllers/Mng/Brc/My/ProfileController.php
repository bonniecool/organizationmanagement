<?php

namespace App\Modules\User\Http\Controllers\Mng\Brc\My;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Requests\Mng\Brc\My\UpdatePhotoRequest;
use App\Modules\User\Http\Requests\Mng\Brc\My\UpdateProfileRequest;
use App\Modules\User\Http\Requests\UpdatePasswordRequest;
use App\Modules\User\Http\Resources\User as UserResource;

class ProfileController extends Controller
{
    protected $apiResponse;

    /**
     * __construct
     *
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        ApiResponse $apiResponse
    ) {
        $this->apiResponse = $apiResponse;
    }

    /**
     * Display user's profile
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function profile()
    {
        return (new ApiResponse)->resource(
            new UserResource(request()->user()->profile)
        );
    }

    /**
     * Update user's profile
     *
     * @param  \App\Modules\User\Http\Requests\UpdateProfileRequest $request
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = request()->user();
        $payload = $request->only(config("module_user.request.$user->profile_type.create"));

        $user->profile->update($payload);

        $response['data']    = $user->profile;
        $response['message'] = 'Profile successfully updated.';

        return $this->apiResponse->resource($response);
    }

    /**
     * Update user's photo
     *
     * @param  \App\Modules\User\Http\Requests\My\UpdatePhotoRequest  $request
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function updatePhoto(UpdatePhotoRequest $request)
    {
        $payload = $request->only('photo');
        $profile = request()->user()->profile;

        $profile->update($payload);

        $response['data']    = $profile;
        $response['message'] = 'Profile photo successfully updated.';

        return $this->apiResponse->resource($response);
    }

    /**
     * Update users's password
     * @param  \App\Modules\User\Http\Requests\UpdatePasswordRequest;  $request
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function changePassword(UpdatePasswordRequest $request)
    {
        $payload = $request->only(config('module_user.change_password'));

        $user = $request->user();

        if (!Hash::check($payload['current_password'], $user->password)) {
            $msg = 'The old password does not match your current password. Please try again later.';
            return $this->apiResponse->badRequest($msg);
        }

        if (!$user->update(['password' => $payload['new_password']])) {
            $msg = 'Failed to change your password. Please try again later.';
            return $this->apiResponse->badRequest($msg);
        }

        $response['message'] = 'You have succesfully changed your password.';
        return $this->apiResponse->resource($response);
    }
}
