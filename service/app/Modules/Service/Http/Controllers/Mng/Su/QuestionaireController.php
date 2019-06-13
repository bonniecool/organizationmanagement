<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;
use App\Modules\Service\Http\Requests\Mng\Su\QuestionaireRequest;
use App\Modules\Service\Http\Resources\QuestionaireCollection;
use App\Modules\Service\Http\Resources\Questionaire as QuestionaireResource;
use App\Modules\Service\Repositories\QuestionaireRepository;
use Damnyan\Cmn\Services\ApiResponse;

use App\Modules\Service\Repositories\ServiceRepository;

use App\Modules\Service\Http\Resources\ServiceCollection;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceRequest;
use App\Modules\Service\Http\Resources\Service as ServiceResource;

class QuestionaireController extends Controller
{

    protected $questionaire;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Service    $service    description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        QuestionaireRepository $questionaire,
        ApiResponse $apiResponse
    ) {
        $this->questionaire    = $questionaire;
        $this->apiResponse = $apiResponse;
    }
    /**
     * index questionaire
     *
     * @return void
     */
    public function index()
    {
        $questionaires = $this->questionaire->getOrPaginate();
        return $this->apiResponse->resource(new QuestionaireCollection($questionaires));
    }

    /**
     * show questionaire
     *
     * @param string $userId description
     * @return void
     */
    public function show($id)
    {
        $questionaire = $this->questionaire->findOrFail($id);
        return $this->apiResponse->resource(new QuestionaireResource($questionaire));
    }

    /**
     * update questionaire
     *
     * @param UpdateSiteUserRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function update(QuestionaireRequest $request, $id)
    {
        $data = $request->only(config('module_questionaire.request.su.update'));
        $questionaire = $this->questionaire->findOrFail($id);
        $questionaire->update($data);

        return $this->apiResponse->resource(
            (
            new QuestionaireResource($questionaire->fresh())
            )->additional(['message' => 'Questionaire successfully updated.'])
        );
    }

    /**
     * store questionaire
     * @param AdministratorProfileRequest $request
     * @param $userId
     */
    public function store(QuestionaireRequest $request)
    {
        $data = $request->only(config('module_questionaire.request.su.store'));
        $questionaire = $this->questionaire->create($data);
        return $this->apiResponse->resource(
            (
            new QuestionaireResource($questionaire)
            )->additional(['message' => 'Questionaire successfully created.'])
        );
    }

    /**
     * delete questionaire
     * @param AdministratorProfileRequest $request
     * @param $userId
     */
    public function delete($serviceId)
    {
        $questionaire = $this->questionaire->findOrFail($serviceId);
        $questionaire->delete();
        return $this->apiResponse->resource(
            (
            new QuestionaireResource($questionaire)
            )->additional(['message' => 'Questionaire successfully deleted.'])
        );
    }
}
