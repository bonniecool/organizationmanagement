<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Group\Repositories\GroupRepository;
use App\Modules\Service\Http\Requests\Mng\Su\StageRequest;
use App\Modules\Service\Http\Requests\Mng\Su\StageGroupRequest;
use App\Modules\Service\Http\Requests\Mng\Su\StageGroupArrangeRequest;
use App\Modules\Service\Http\Resources\Stage;
use App\Modules\Service\Http\Resources\StageCollection;
use App\Modules\Group\Http\Resources\GroupCollection;

class StageGroupController extends Controller
{

    protected $stage;

    protected $group;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Stage       $stage       description
     * @param Group       $group       description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        StageRepository $stage,
        groupRepository $group,
        ApiResponse $apiResponse
    ) {
        $this->stage       = $stage;
        $this->group       = $group;
        $this->apiResponse = $apiResponse;
    }
    /**
     * index stage group
     *
     * @return void
     */
    public function index($stageId)
    {
        $stageGroups = $this->stage
            ->findOrFail($stageId)
            ->groups()
            ->getOrPaginate();

        return $this->apiResponse->resource(new GroupCollection($stageGroups));
    }

    /**
     * show stage group
     *
     * @param integer $stageId description
     * @param integer $groupId description
     * @return void
     */
    public function show($stageId, $groupId)
    {
        $stageGroup = $this->stage
            ->findOrFail($stageId)
            ->questionaires()
            ->findOrFail($groupId);

        return $this->apiResponse->resource(new Group($stageGroup));
    }

    /**
     * Attach groups
     *
     * @param StageRequest $request description
     * @param integer      $stageId description
     * @return void
     */
    public function attach(StageGroupRequest $request, $stageId)
    {
        $data = $request->only('groups');
    
        return DB::transaction(function() use ($data, $stageId) {
            $items = $data['groups'];
            foreach ($items as $item) {
                if ($this->stage->findOrFail($stageId)->groups()->where('id', $item)->count()) {
                    return $this->apiResponse->badRequest("Group id {$item} already exists.");
                }

                $order = $this->stage
                    ->find($stageId)
                    ->groups()
                    ->withPivot('order')
                    ->max('order');

                $max = $order ?? 0;

                $this->stage
                    ->findOrFail($stageId)
                    ->groups()
                    ->attach($item, ['order' => $max + 1]);
            }

            $groups = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->getOrPaginate();

            return $this->apiResponse->resource(new GroupCollection($groups))->additional([
                'message' => $this->stage->getResourceName().' group is successfully created.'
            ]);
        });
    }

    /**
     * Detach groups
     * @param StageGroupRequest $request
     * @param $stageId
     * @return mixed
     */
    public function detach(StageGroupRequest $request, $stageId)
    {
        $data = $request->only('groups');

        return DB::transaction(function() use($data, $stageId){
            $items = $data['groups'];
            foreach ($items as $item) {
                if (!$this->stage->findOrFail($stageId)->groups()->where('id', $item)->count()) {
                    return $this->apiResponse->badRequest("There is no such group id {$item} attached in this stage. Please try again.");
                }

                $this->stage
                    ->findOrFail($stageId)
                    ->groups()
                    ->detach($item);
            }

            $groups = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->getOrPaginate();

            return $this->apiResponse->resource(new GroupCollection($groups))->additional([
                'message' => $this->stage->getResourceName().' group successfully deleted.'
            ]);
        });
    }

    /**
     * Arrange Order
     * @param $stageId
     * @param $groupId
     * @return mixed
     */
    public function arrange(StageGroupArrangeRequest $request, $stageId, $groupId)
    {
        $data = $request->only('step');

        return DB::transaction(function() use($data, $stageId, $groupId) {
            $selected = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->findOrFail($groupId)
                ->pivot
                ->order;

            $step = $data['step'] < 0 ? $selected - abs($data['step']) : $selected + abs($data['step']);

            $step_in_array = $step - 1;

            if (!self::checkIndexes($stageId, $step, $selected, $data)) {
                return $this->apiResponse->badRequest('Step should not exceed proper order.');
            }
            $selected = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->findOrFail($groupId);

            $orders = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->where('id', '!=', $groupId)
                ->orderBy('order')
                ->get();

            $collection = $orders->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'order' => $item->pivot->order
                ];
            });

            $collection->splice($step_in_array, 0, [
                [
                    'id' => $selected->id,
                    'order' => $step_in_array
                ]
            ]);

            for ($i = 0; $i < $collection->count(); $i++) {
                $this->stage
                    ->findOrFail($stageId)
                    ->groups()
                    ->updateExistingPivot($collection[$i]['id'], ['order' => $i + 1]);
            }

            $response = $this->stage
                ->findOrFail($stageId)
                ->groups()
                ->orderBy('order')
                ->get();

            return $this->apiResponse->resource(new GroupCollection($response))->additional([
                'message' => $this->stage->getResourceName().' group successfully organized.'
            ]);
        });
    }

    /**
     * Undocumented function
     *
     * @param [type] $stageId
     * @param [type] $step
     * @param [type] $selected
     * @param [type] $data
     * @return void
     */
    public function checkIndexes($stageId, $step, $selected, $data)
    {
        $condition = $data['step'] < 0 ? '<' : '>';

        $rows = $this->stage
            ->findOrFail($stageId)
            ->groups()
            ->withPivot('order')
            ->where('order', $condition, $selected)
            ->count();

        if ($data['step'] < 0 && $step == 0) {
            return false;
        }

        if ($data['step'] > 0 && $data['step'] > abs($rows)) {
            return false;
        }

        return true;
    }
}