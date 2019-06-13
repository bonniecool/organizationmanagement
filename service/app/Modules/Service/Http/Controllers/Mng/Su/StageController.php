<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Service\Http\Requests\Mng\Su\StageRequest;
use App\Modules\Service\Http\Requests\Mng\Su\StageGroupRequest;
use App\Modules\Service\Http\Resources\Stage;
use App\Modules\Service\Http\Resources\StageCollection;
use Illuminate\Support\Facades\DB;

class StageController
{

    protected $stage;

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
        ApiResponse $apiResponse
    ) {
        $this->stage       = $stage;
        $this->apiResponse = $apiResponse;
    }
    /**
     * Undocumented function
     *
     * @return [list of groups]
     */
    public function index()
    {
        $stages = $this->stage->getOrPaginate();
        return $this->apiResponse->resource(new StageCollection($stages));
    }

    /**
     * Undocumented function
     *
     * @param [type] $stageId [stage id]
     * @return [selected stage details]
     */
    public function show($stageId)
    {
        $stage = $this->stage->findOrFail($stageId);
        return $this->apiResponse->resource(new Stage($stage));
    }

    /**
     * Undocumented function
     *
     * @param Request $request [request]
     * @return [add stage]
     */
    public function store(StageRequest $request)
    {
        $payload = $request->only(config('module_stage.requests.su'));
        $data = self::buildData($payload);

        return DB::transaction(function() use($data){
            $stage = $this->stage->create($data['stage']);
            $emailContent = $stage->emailContent()->create($data['content']);
            $response['data']    = [
                'stage' => $stage,
                'email_content' => $emailContent
            ];
            $response['message'] = 'Stage is successfully created.';
            return $this->apiResponse->resource($response);
        });
    }

    public function buildData($payload)
    {
        return [
          'stage' => [
              'name' => $payload['name'],
              'description' => $payload['description']
          ],
          'content' => [
              'subject' => $payload['subject'],
              'body' => $payload['body'],
              'signature' => $payload['signature']
          ]
        ];
    }

    /**
     * Undocumented function
     *
     * @param Request $request [request]
     * @param [type]  $stageId [stage id]
     * @return [update selected stage]
     */
    public function update(StageRequest $request, $stageId)
    {
        $payload = $request->only(config('module_stage.requests.su'));
        $data = self::buildData($payload);
        $stage = $this->stage->findOrFail($stageId);

        return DB::transaction(function() use($stage, $data){
            $stage->update($data['stage']);
            $emailContent = $stage->emailContent()->create($data['content']);
            $response['data']    = [
                'stage' => $stage,
                'email_content' => $emailContent
            ];
            $response['message'] = 'Stage is successfully updated.';
            return $this->apiResponse->resource($response);
        });
    }

    /**
     * Undocumented function
     *
     * @param [type] $stageId [stage id]
     * @return void
     */
    public function delete($stageId)
    {
        return DB::transaction(function() use($stageId){
            $stage = $this->stage->findOrFail($stageId);

            $stage->emailContent()->delete();
            $stage->delete();
            $response['data']    = [
                'stage' => $stage
            ];
            $response['message'] = 'Stage is successfully deleted.';
            return $this->apiResponse->resource($response);
        });
    }
}