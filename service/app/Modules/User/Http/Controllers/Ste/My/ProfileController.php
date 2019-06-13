<?php

namespace App\Modules\User\Http\Controllers\Ste\My;

use App\Http\Controllers\Controller;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyContactInformationRequest;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyEmergencyInformationRequest;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyFamilyInformationRequest;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyPassportInformationRequest;
use App\Modules\User\Http\Requests\Ste\My\CreateDependencyPersonalInformationRequest;
use App\Modules\User\Http\Requests\Ste\UpdateSiteUserRequest;
use App\Modules\User\Http\Requests\UpdatePhotoRequest;
use App\Modules\User\Http\Resources\Dependency;
use App\Modules\User\Http\Resources\DependencyPhoto;
use App\Modules\User\Http\Resources\User as UserResource;
use Damnyan\Cmn\Services\ApiResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    protected $apiResponse;

    /**
     * __construct
     *
     * @param ApiResponse $apiResponse description
     */
    public function __construct(ApiResponse $apiResponse)
    {
        $this->apiResponse = $apiResponse;
    }

    /**
     * show profile
     *
     * @return void
     */
    public function profile()
    {
        return $this->apiResponse->resource(
            new Dependency(
                request()->user()->profile->load(
                    'country',
                    'municipality',
                    'region',
                    'barangay',
                    'province',
                    'birthRegion',
                    'birthProvince',
                    'birthMunicipality'
                )
            )
        );
    }

    /**
     * update profile
     *
     * @param UpdateSiteUserRequest $request description
     * @return void
     */
    public function updateProfile(UpdateSiteUserRequest $request)
    {
        $user = request()->user();

        $data = $request->only(config('module_user.request.site_user.update'));
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new UserResource(request()->user())
            )->additional(['message' => 'Profile successfully updated.'])
        );
    }

    /**
     * update photo
     *
     * @param UpdatePhotoRequest $request description
     * @return void
     */
    public function updatePhoto(UpdatePhotoRequest $request)
    {
        $data = $request->only('photo');

        $user                 = request()->user();
        $user->profile->photo = $data['photo'];
        $user->profile->save();

        return $this->apiResponse->resource(
            (
                new UserResource(request()->user())
            )->additional(['message' => 'Photo successfully updated.'])
        );
    }

    /**
     * update personal
     *
     * @param CreateDependencyPersonalInformationRequest $request description
     * @return void
     */
    public function updatePersonal(
        CreateDependencyPersonalInformationRequest $request
    ) {
        $message = 'Personal Information successfully updated.';
        $user    = request()->user();

        $data = $request->only(
            config('module_user.request.dependency.create.personal_information')
        );

        $data['is_first_time']         = 0;
        $data['is_personal_completed'] = 1;
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new Dependency(request()->user()->profile)
            )->additional(
                [
                    'message' => $message,
                ]
            )
        );
    }

    /**
     * update family
     *
     * @param CreateDependencyFamilyInformationRequest $request description
     * @return void
     */
    public function updateFamily(
        CreateDependencyFamilyInformationRequest $request
    ) {
        $user = request()->user();

        $data = $request->only(
            config('module_user.request.dependency.create.family_information')
        );

        $data['is_first_time']       = 0;
        $data['is_family_completed'] = 1;
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new Dependency(
                    request()->user()->profile
                )
            )->additional(
                [
                    'message' => 'Family Information successfully updated.',
                ]
            )
        );
    }

    /**
     * update passport
     *
     * @param CreateDependencyPassportInformationRequest $request description
     * @return void
     */
    public function updatePassport(
        CreateDependencyPassportInformationRequest $request
    ) {
        $message = 'Passport Information successfully updated.';
        $user    = request()->user();

        $data = $request->only(
            config('module_user.request.dependency.create.passport_information')
        );

        $data['is_first_time']         = 0;
        $data['is_passport_completed'] = 1;
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new Dependency(request()->user()->profile)
            )->additional(
                [
                    'message' => $message,
                ]
            )
        );
    }

    /**
     * update emergency
     *
     * @param CreateDependencyEmergencyInformationRequest $request description
     * @return void
     */
    public function updateEmergency(
        CreateDependencyEmergencyInformationRequest $request
    ) {
        $message = 'Emergency Information successfully updated.';
        $user    = request()->user();

        $data = $request->only(
            config(
                'module_user.request.dependency.create.emergency_information'
            )
        );

        $data['is_first_time']          = 0;
        $data['is_emergency_completed'] = 1;
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new Dependency(
                    request()->user()->profile
                )
            )->additional(
                [
                    'message' => $message,
                ]
            )
        );
    }

    /**
     * show photo
     *
     * @return void
     */
    public function showPhoto()
    {
        return $this->apiResponse->resource(
            new DependencyPhoto(request()->user()->profile)
        );
    }

    /**
     * update contact
     *
     * @param CreateDependencyContactInformationRequest $request description
     * @return void
     */
    public function updateContact(
        CreateDependencyContactInformationRequest $request
    ) {
        $user = request()->user();

        $data = $request->only(
            config('module_user.request.dependency.create.contact_information')
        );

        $data['is_first_time']        = 0;
        $data['is_contact_completed'] = 1;
        $user->profile->update($data);

        $user->save();

        return $this->apiResponse->resource(
            (
                new Dependency(
                    request()->user()->profile
                )
            )->additional(
                [
                    'message' => 'Contact Information successfully updated.',
                ]
            )
        );
    }
}
