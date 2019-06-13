<?php

namespace App\Modules\Group\Http\Controllers\Mng\Su;

use App\Modules\Group\Http\Requests\Mng\Su\GroupAdminRequest;
use App\Modules\User\Repositories\AdministratorRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Group\Repositories\GroupRepository;
use App\Modules\Group\Http\Requests\Mng\Su\GroupRequest;
use App\Modules\Group\Http\Resources\Group;
use App\Modules\Group\Http\Resources\GroupCollection;
use Illuminate\Support\Facades\DB;

class GroupController
{

    protected $admin;

    protected $group;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Admin       $admin       description
     * @param Group       $group       description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        AdministratorRepository $admin,
        GroupRepository $group,
        ApiResponse $apiResponse
    ) {
        $this->admin       = $admin;
        $this->group       = $group;
        $this->apiResponse = $apiResponse;
    }

    /**
     * show all groups
     *
     * @return [list of groups]
     */
    public function index()
    {
        $groups = $this->group->getOrPaginate();
        return $this->apiResponse->resource(new GroupCollection($groups));
    }

    /**
     * show group
     *
     * @param [type] $groupId [group id]
     * @return [selected group details]
     */
    public function show($groupId)
    {
        $group = $this->group->findOrFail($groupId);
        return $this->apiResponse->resource(new Group($group));
    }

    /**
     * create group
     *
     * @param Request $request [request]
     * @return [add group]
     */
    public function store(GroupRequest $request)
    {
        $payload = $request->only('code', 'name', 'description', 'attach_profile_id');

        $users = $payload['attach_profile_id'] ?? null;

        return \DB::transaction(function() use($payload, $users){
            $group = $this->group->create($payload);
            if($users)
            {
                foreach ($users as $userId)
                {
                    $this->admin->findOrFail($userId)
                        ->group()
                        ->associate($group)
                        ->save();
                }
            }
            return $this->apiResponse->resource(new Group($group))->additional([
                'message' => $group->getResourceName().' successfully created.'
            ]);
        });
    }

    /**
     * update group
     *
     * @param Request $request [request]
     * @param [type]  $groupId [group id]
     * @return [update selected group]
     */
    public function update(GroupRequest $request, $groupId)
    {
        $payload = $request->only('name', 'description', 'attach_profile_id');

        $users = $payload['attach_profile_id'] ?? null;

        return \DB::transaction(function() use($payload, $users, $groupId){
            $group = $this->group->findOrFail($groupId);
            $group->update($payload);

            $administrators = $group->administrators;
            foreach ($administrators as $admin) {
                $admin->group()->dissociate($admin)->save();
            }

            if ($users) {
                foreach ($users as $userId) {
                    $this->admin->findOrFail($userId)
                        ->group()
                        ->associate($group)
                        ->save();
                }
            }

            return $this->apiResponse->resource(new Group($group->fresh()))->additional([
                'message' => $group->getResourceName().' successfully updated.'
            ]);
        });
    }

    /**
     * delete group
     *
     * @param [type] $groupId [group id]
     * @return void
     */
    public function delete($groupId)
    {
        $group = $this->group->findOrFail($groupId)->delete();

        $message = 'Succesfully deleted Group.';

        $response['message'] = $message;
        return $this->apiResponse->resource($response);
    }

    /**
     * attach admin to group
     *
     * @param [type] $groupId [group id]
     * @return void
     */
    public function attach(GroupAdminRequest $request, $groupId)
    {
        $data = $request->only('administrators');
        $group = $this->group->findOrFail($groupId);
        $admins = $this->admin->whereIn('id', $data['administrators'])->get();

        return DB::transaction(function() use($group, $admins){
            foreach ($admins as $admin)
            {
                $admin->group()->associate($group)->save();

            }
            return $this->apiResponse->responseOk('Group user succesfully assigned.');
        });
    }

    /**
     * activate group
     * @param $groupId [group id]
     */
    public function activate($groupId)
    {
        $group = $this->group->findOrFail($groupId);

        if ($group->is_active) {
            $response['message'] = 'This group is already activated.';
            return $this->apiResponse->badRequest($response);
        }

        $group->update(['is_active' => 1]);

        $response['data'] = $group;
        $response['message'] = 'Group successfully activated.';
        return $this->apiResponse->resource($response);
    }

    /**
     * deactivate group
     * @param $groupId [group id]
     */
    public function deactivate($groupId)
    {
        $group = $this->group->findOrFail($groupId);

        if (!$group->is_active) {
            $response['message'] = 'This group is already deactivated.';
            return $this->apiResponse->badRequest($response);
        }

        $group->update(['is_active' => 0]);

        $response['data'] = $group;
        $response['message'] = 'Group successfully deactivated.';
        return $this->apiResponse->resource($response);
    }

     /* detach admin to group
      *
      * @param [type] $groupId [group id]
      * @return void
      */
    public function detach(GroupAdminRequest $request, $groupId)
    {
        $data = $request->only('administrators');
        $group = GroupRepository::findOrFail($groupId);
        $admins = AdministratorRepository::whereIn('id', $data['administrators'])->get();

        return DB::transaction(function() use($group, $admins){
            foreach ($admins as $admin)
            {
                $admin->group()->dissociate($group)->save();

            }
            return (new ApiResponse)->responseOk('Group user succesfully detached.');
        });
    }

}