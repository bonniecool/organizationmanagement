<?php

namespace App\Modules\User\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Resources\UserCollection;
use App\Modules\User\Http\Resources\User as UserResource;
use App\Modules\User\Repositories\AdministratorRepository;
use App\Modules\User\Http\Requests\Mng\Su\AdministratorProfileRequest;


class AdministratorController extends Controller
{

    protected $admin;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Administrator    $admin    description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        AdministratorRepository $admin,
        ApiResponse $apiResponse
    ) {
        $this->admin    = $admin;
        $this->apiResponse = $apiResponse;
//        $this->middleware('throttle:60,1')->only('register');
    }
    /**
     * index Admin user
     *
     * @return void
     */
    public function index()
    {
        $admins = $this->admin->getOrPaginate();
        return $this->apiResponse->resource(new UserCollection($admins));
    }

    /**
     * show Admin user
     *
     * @param string $userId description
     * @return void
     */
    public function show($userId)
    {
        $admin = $this->admin->findOrFail($userId);
        return $this->apiResponse->resource(new UserResource($admin));
    }

    /**
     * update Admin user
     *
     * @param UpdateSiteUserRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function update(AdministratorProfileRequest $request, $userId)
    {
        $data = $request->only(config('module_user.request.administrator.update'));
        $admin = $this->admin->findOrFail($userId);
        $admin = $admin->updateProfile($data);

        return $this->apiResponse->resource(
            (
            new UserResource($admin)
            )->additional(['message' => 'Profile successfully updated.'])
        );
    }

    /**
     * store Admin user
     * @param AdministratorProfileRequest $request
     * @param $userId
     */
    public function store(AdministratorProfileRequest $request)
    {
        $data = $request->only(config('module_user.request.administrator.store'));
        $admin = $this->admin->createProfile($data);
        return $admin;
        return $this->apiResponse->resource(
            (
            new UserResource($admin)
            )->additional(['message' => 'Profile successfully updated.'])
        );
    }

    /**
     * activate Admin user
     * @param $userId [user id]
     */
    public function activate($userId)
    {
        $admin = $this->admin->findOrFail($userId);

        if ($admin->is_active) {
            $response['message'] = 'This account is already activated.';
            return $this->apiResponse->badRequest($response);
        }

        $admin->update(['is_active' => 1]);

        $response['data'] = $admin;
        $response['message'] = 'Profile successfully activated.';
        return $this->apiResponse->resource($response);
    }

    /**
     * deactivate Admin user
     * @param $userId [user id]
     */
    public function deactivate($userId)
    {
        $admin = $this->admin->findOrFail($userId);

        if (!$admin->is_active) {
            $response['message'] = 'This account is already deactivated.';
            return $this->apiResponse->badRequest($response);
        }

        $admin->update(['is_active' => 0]);

        $response['data'] = $admin;
        $response['message'] = 'Profile successfully deactivated.';
        return $this->apiResponse->resource($response);
    }
}
