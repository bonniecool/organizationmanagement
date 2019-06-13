<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceQuestionArrangeRequest;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceQuestionRequest;
use App\Modules\Service\Http\Resources\Questionaire;
use App\Modules\Service\Http\Resources\QuestionaireCollection;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceRequest;
use Illuminate\Support\Facades\DB;

class ServiceQuestionaireController extends Controller
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
     * index service questionaire
     *
     * @return void
     */
    public function index($serviceId)
    {
        $questionaires = $this->service->findOrFail($serviceId)->questionaires()->getOrPaginate();
        return $this->apiResponse->resource(new QuestionaireCollection($questionaires));
    }

    /**
     * show service questionaire
     *
     * @param integer $serviceId description
     * @return void
     */
    public function show($serviceId, $id)
    {
        $questionaire = $this->service->findOrFail($serviceId)->questionaires()->findOrFail($id);
        return $this->apiResponse->resource(new Questionaire($questionaire));
    }

    /**
     * Attach question
     *
     * @param ServiceRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function attach(ServiceQuestionRequest $request, $serviceId)
    {
        $data = $request->only('questions');
        return DB::transaction(function() use($data, $serviceId){
            $items = $data['questions'];
            foreach($items as $item)
            {
                if($this->service->findOrFail($serviceId)->questionaires()->where('id', $item)->count())
                {
                    return $this->apiResponse->badRequest("Question id {$item} already exists.");
                }
                $order = $this->service->find($serviceId)->questionaires()->withPivot('order')->max('order');
                $max = $order ?? 0;
                $this->service->findOrFail($serviceId)->questionaires()->attach($item, ['order' => $max + 1]);
            }
            $questions = $this->service->findOrFail($serviceId)->questionaires()->getOrPaginate();
            return $this->apiResponse->resource(new QuestionaireCollection($questions))->additional([
                'message' => $this->service->getResourceName().' questionaire is successfully created.'
            ]);
        });
    }

    /**
     * Detach questions
     * @param ServiceQuestionRequest $request
     * @param $serviceId
     * @return mixed
     */
    public function detach(ServiceQuestionRequest $request, $serviceId)
    {
        $data = $request->only('questions');
        return DB::transaction(function() use($data, $serviceId){
            $items = $data['questions'];
            foreach($items as $item)
            {
                if(!$this->service->findOrFail($serviceId)->questionaires()->where('id', $item)->count())
                {
                    return $this->apiResponse->badRequest("There is no such question id {$item} attached in this service. Please try again.");
                }
                $this->service->findOrFail($serviceId)->questionaires()->detach($item);
            }
            $questions = $this->service->findOrFail($serviceId)->questionaires()->getOrPaginate();
            return $this->apiResponse->resource(new QuestionaireCollection($questions))->additional([
                'message' => $this->service->getResourceName().' questionaire successfully deleted.'
            ]);
        });
    }

    /**
     * Arrange Order
     * @param $serviceId
     * @param $questionId
     * @return mixed
     */
    public function arrange(ServiceQuestionArrangeRequest $request, $serviceId, $questionId)
    {
        $data = $request->only('step');
        return DB::transaction(function() use($data, $serviceId, $questionId) {
            $selected = $this->service->findOrFail($serviceId)->questionaires()->findOrFail($questionId)->pivot->order;
            $step = $data['step'] < 0 ? $selected - abs($data['step']) : $selected + abs($data['step']);
            $step_in_array = $step - 1;
            if (!self::checkIndexes($serviceId, $step, $selected, $data)) {
                return $this->apiResponse->badRequest('Step should not exceed proper order.');
            }
            $selected = $this->service->findOrFail($serviceId)->questionaires()->findOrFail($questionId);
            $orders = $this->service->findOrFail($serviceId)->questionaires()->where('id', '!=', $questionId)->orderBy('order')->get();
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
                $this->service->findOrFail($serviceId)->questionaires()->updateExistingPivot($collection[$i]['id'], ['order' => $i + 1]);
            }
            $response = $this->service->findOrFail($serviceId)->questionaires()->orderBy('order')->get();
            return $this->apiResponse->resource(new QuestionaireCollection($response))->additional([
                'message' => $this->service->getResourceName().' questionaire successfully organized.'
            ]);
        });
    }

    /**
     * Arrange order of attached questionaires
     * @param $serviceId
     * @param $step
     * @param $selected
     * @param $data
     * @return bool
     */
    public function checkIndexes($serviceId, $step, $selected, $data)
    {
        $condition = $data['step'] < 0 ? '<' : '>';
        $rows = $this->service->findOrFail($serviceId)->questionaires()->withPivot('order')->where('order', $condition, $selected)->count();
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
