<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;


use App\Modules\Group\Repositories\GroupRepository;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceQuestionRequest;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceStageArrangeRequest;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceStageRequest;


use App\Modules\Service\Http\Requests\Mng\Su\StageRequest;
use App\Modules\Service\Http\Resources\Stage;
use App\Modules\Service\Http\Resources\StageCollection;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceRequest;
use Illuminate\Support\Facades\DB;

class ServiceStageController extends Controller
{

    protected $service;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Service    $service    description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        ServiceRepository $service,
        ApiResponse $apiResponse
    ) {
        $this->service    = $service;
        $this->apiResponse = $apiResponse;
    }
    /**
     * index service stages
     *
     * @return void
     */
    public function index($serviceId)
    {
        $stages = $this->service->findOrFail($serviceId)->stages()->getOrPaginate();
        return $this->apiResponse->resource(new StageCollection($stages));
    }

    /**
     * show service stage
     *
     * @param integer $serviceId description
     * @return void
     */
    public function show($serviceId, $id)
    {
        $stage = $this->service->findOrFail($serviceId)->stages()->findOrFail($id);
        return $this->apiResponse->resource(new Stage($stage));
    }

    /**
     * Store service stage
     *
     * @param integer $serviceId description
     * @return void
     */
    public function store(StageRequest $request, $serviceId)
    {
        $data = $request->only(config('module_stage.requests.su'));
        $group = GroupRepository::findOrFail($data['group_id']);
        $service = $this->service->findOrFail($serviceId);

        $data['order'] = self::checkOrder($service);
        $stage = $service->stages()->create($data);
        $stage->group()->associate($group)->save();
        return $this->apiResponse->resource(new Stage($stage))->additional([
            'message' => $stage->getResourceName().' successfully created.'
        ]);
    }

    public function checkOrder($service)
    {
        $order = $service->stages()->max('order') ?? 1;
        return $order + 1;
    }

    /**
     * update service stage
     *
     * @param integer $serviceId description
     * @return void
     */
    public function update(StageRequest $request, $serviceId, $id)
    {
        $data = $request->only(config('module_stage.requests.su'));
        $group = GroupRepository::findOrFail($data['group_id']);
        $service = $this->service->findOrFail($serviceId);
        $stage = $service->stages()->findOrFail($id);
        $stage->group()->associate($group)->save();
        $stage->update($data);
        return $this->apiResponse->resource(new Stage($stage))->additional([
            'message' => $stage->getResourceName().' successfully updated.'
        ]);
    }

    /**
     * delete service stage
     *
     * @param integer $serviceId description
     * @return void
     */
    public function delete($serviceId, $id)
    {
        $stage = $this->service->findOrFail($serviceId)->stages()->findOrFail($id);
        $stage->delete();
        return $this->apiResponse->resource(new Stage($stage))->additional([
            'message' => $stage->getResourceName().' successfully deleted.'
        ]);
    }

    /**
     * Attach stage
     *
     * @param ServiceRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function attach(ServiceStageRequest $request, $serviceId)
    {
        $data = $request->only('stages');
        return DB::transaction(function() use($data, $serviceId){
            $items = $data['stages'];
            foreach($items as $item)
            {
                if($this->service->findOrFail($serviceId)->stages()->where('id', $item)->count())
                {
                    return $this->apiResponse->badRequest("Question id {$item} already exists.");
                }
                $order = $this->service->find($serviceId)->stages()->withPivot('order')->max('order');
                $max = $order ?? 0;
                $this->service->findOrFail($serviceId)->stages()->attach($item, ['order' => $max + 1]);
            }
            $stages = $this->service->findOrFail($serviceId)->stages()->getOrPaginate();
            return $this->apiResponse->resource(new StageCollection($stages))->additional([
                'message' => $this->service->getResourceName().' stage is successfully created.'
            ]);
        });
    }

    /**
     * Detach stage
     * @param ServiceQuestionRequest $request
     * @param $serviceId
     * @return mixed
     */
    public function detach(ServiceQuestionRequest $request, $serviceId)
    {
        $data = $request->only('stages');
        return DB::transaction(function() use($data, $serviceId){
            $items = $data['stages'];
            foreach($items as $item)
            {
                if(!$this->service->findOrFail($serviceId)->stages()->where('id', $item)->count())
                {
                    return $this->apiResponse->badRequest("There is no such stage id {$item} attached in this service. Please try again.");
                }
                $this->service->findOrFail($serviceId)->stages()->detach($item);
            }
            $stages = $this->service->findOrFail($serviceId)->stages()->getOrPaginate();
            return $this->apiResponse->resource(new StageCollection($stages))->additional([
                'message' => $this->service->getResourceName().' stage successfully deleted.'
            ]);
        });
    }

    /**
     * Arrange stage
     * @param $serviceId
     * @param $stageId
     * @return mixed
     */
    public function arrange(ServiceStageArrangeRequest $request, $serviceId, $stageId)
    {
        $data = $request->only('step');
        return DB::transaction(function() use($data, $serviceId, $stageId) {
            $selected = $this->service->findOrFail($serviceId)->stages()->findOrFail($stageId)->order;
            $step = $data['step'] < 0 ? $selected - abs($data['step']) : $selected + abs($data['step']);
            $step_in_array = $step - 1;
            if (!self::checkIndexes($serviceId, $step, $selected, $data)) {
                return $this->apiResponse->badRequest('Step should not exceed proper order.');
            }
            $selected = $this->service->findOrFail($serviceId)->stages()->findOrFail($stageId);
            $orders = $this->service->findOrFail($serviceId)->stages()->where('id', '!=', $stageId)->orderBy('order')->get();
            $collection = $orders->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'order' => $item->order
                ];
            });
            $collection->splice($step_in_array, 0, [
                [
                    'id' => $selected->id,
                    'order' => $step_in_array
                ]
            ]);
            for ($i = 0; $i < $collection->count(); $i++) {
                $this->service->findOrFail($serviceId)->stages()->findOrFail($collection[$i]['id'])->update(['order' => $i + 1]);
            }
            $response = $this->service->findOrFail($serviceId)->stages()->orderBy('order')->get();
            return $this->apiResponse->resource(new StageCollection($response))->additional([
                'message' => $this->service->getResourceName().' stage successfully organized.'
            ]);
        });
    }

    /**
     * Arrange order of attached stages
     * @param $serviceId
     * @param $step
     * @param $selected
     * @param $data
     * @return bool
     */
    public function checkIndexes($serviceId, $step, $selected, $data)
    {
        $condition = $data['step'] < 0 ? '<' : '>';
        $rows = $this->service->findOrFail($serviceId)->stages()->where('order', $condition, $selected)->count();
        if($data['step'] < 0 && $step == 0) //if below 0
        {
            return false;
        }
        if($data['step'] > 0 && $data['step'] > abs($rows)) // if above 0
        {
            return false;
        }
        return true;
    }
}
