<?php

namespace App\Modules\User\Http\Controllers\Ste;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Resources\UserCollection;
use App\Modules\User\Http\Resources\User as UserResource;
use App\Modules\User\Repositories\UserRepository as User;
use App\Modules\User\Http\Requests\Ste\CreateSiteUserRequest;
use App\Modules\User\Http\Requests\Ste\UpdateSiteUserRequest;
use App\Modules\User\Repositories\SiteUserRepository as SiteUser;

class SiteUserController extends Controller
{

    protected $siteUser;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param SiteUser    $siteUser    description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        SiteUser $siteUser,
        ApiResponse $apiResponse
    ) {
        $this->siteUser    = $siteUser;
        $this->apiResponse = $apiResponse;
        $this->middleware('throttle:60,1')->only('register');
    }
    /**
     * index site user
     *
     * @return void
     */
    public function index()
    {
        $users = $this->siteUser->siteUser()
            ->getOrPaginate();

        return $this->apiResponse->resource(new UserCollection($users));
    }

    /**
     * register site user
     *
     * @param CreateSiteUserRequest $request description
     * @return void
     */
    public function register(CreateSiteUserRequest $request)
    {
        $data = $request->only(config('module_user.request.site_user.register'));

        if (!isset($data['name'])) {
            $data['name'] = "{$data['first_name']} {$data['last_name']}";
        }
        $user = $this->siteUser->createProfile($data);
        return $this->apiResponse->resource(
            (
                new UserResource($user->profile)
            )->additional(['message' => 'Successfully registered. Please check your email to activate your account.'])
        );
    }

    /**
     * show site user
     *
     * @param string $userId description
     * @return void
     */
    public function show($userId)
    {
        $user = $this->siteUser->siteUser()
            ->findOrFail($userId);

        return $this->apiResponse->resource(new UserResource($user));
    }

    /**
     * update site user
     *
     * @param UpdateSiteUserRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function update(UpdateSiteUserRequest $request, $userId)
    {
        $data = $request->only(
            config('module_user.request.administrator.update')
        );

        $user = $this->siteUser->siteUser()
            ->findOrFail($userId);

        $user->profile->updateProfile($data);

        return $this->apiResponse->resource(
            (
                new UserResource($user)
            )->additional(['message' => 'Profile successfully updated.'])
        );
    }
}
