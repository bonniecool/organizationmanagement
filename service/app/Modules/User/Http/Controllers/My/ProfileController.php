<?php

namespace App\Modules\User\Http\Controllers\My;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Requests\My\UpdatePhotoRequest;
use App\Modules\User\Http\Resources\User as UserResource;
use App\Modules\User\Http\Requests\My\UpdateProfileRequest;

class ProfileController extends Controller
{
    /**
     * Display user's profile
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function show()
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
        $payload = $request->only(config("module_user.request.$user->profile_type.update"));
        $profile = $user->profile;
        $profile->update($payload);
        $user->completed_profile = 1;
        $user->save();

        return (new ApiResponse)->resource(
            (new UserResource($profile))->additional([
                'message' => 'Profile successfully updated.'
            ])
        );
    }

    /**
     * Update user's photo
     *
     * @param  \App\Modules\User\Http\Requests\UpdatePhotoRequest  $request
     *
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function updatePhoto(UpdatePhotoRequest $request)
    {
        $data = $request->only('photo');
        // dd($data['photo']);
        $user = request()->user();
        $profile = $user->profile;

        $profile->photo = $data['photo'];
        $profile->save();

        return (new ApiResponse)->resource(
            (new UserResource($profile))->additional([
                'message' => 'Photo successfully updated.'
            ])
        );
    }
}
