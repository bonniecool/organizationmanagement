<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Http\Resources\ServiceCollection;
use App\Modules\Service\Http\Requests\Mng\Su\ServiceRequest;
use App\Modules\Service\Http\Resources\Service as ServiceResource;

class ServiceController extends Controller
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
     * index service
     *
     * @return void
     */
    public function index()
    {
        $services = $this->service->getOrPaginate();
        return $this->apiResponse->resource(new ServiceCollection($services));
    }

    /**
     * show service
     *
     * @param integer $serviceId description
     * @return void
     */
    public function show($serviceId)
    {
        $service = $this->service->findOrFail($serviceId);
        return $this->apiResponse->resource(new ServiceResource($service));
    }

    /**
     * update service
     *
     * @param ServiceRequest $request description
     * @param string                $userId  description
     * @return void
     */
    public function update(ServiceRequest $request, $serviceId)
    {
        $service = $this->service->findOrFail($serviceId);
        $data = $request->only(config('module_service.request.su.update'));
        $service->update($data);

        return $this->apiResponse->resource(
            (
            new ServiceResource($service->fresh())
            )->additional(['message' => 'Service successfully updated.'])
        );
    }

    /**
     * store service
     * @param ServiceRequest $request
     * @param $userId
     */
    public function store(ServiceRequest $request)
    {
        $data = $request->only(config('module_service.request.su.store'));
        $service = $this->service->create($data);
        return $this->apiResponse->resource(
            (
            new ServiceResource($service)
            )->additional(['message' => 'Service successfully created.'])
        );
    }

    /**
     * delete service
     * @param ServiceRequest $request
     * @param $userId
     */
    public function delete($serviceId)
    {
        $service = $this->service->findOrFail($serviceId);
        $service->delete();
        return $this->apiResponse->resource(
            (
            new ServiceResource($service)
            )->additional(['message' => 'Service successfully deleted.'])
        );
    }


    /**
     * attach questionaire
     * @param AdministratorProfileRequest $request
     * @param $userId
     */
    public function arrange($serviceId, $questionId)
    {
        /**

         1              1
         2              2
         3 -> -1
         4              4
        ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3Pzk8CmrtjKBQvgt8lLH8ajkwgb/dDPqbhCfiQPG3v7vYYG3GFLZv02gWN0day5Uvlgp4GLqivJJ7p0XeTCOhTy/WGDdGfSHuu5snvwwGYiLRucU30dnLo2HkBcnVsiqzigNPr7XYqdKvcisqqPxuoxXA5bfoJm9yVew14kArgul5+SL9Jm8Bn+RGl8mc4ywOdYlh23iIayXr3+X62IFKfgfzCcz1vdCr0erZF3MiVg70pLlrx8qsqKhF7WEdHH1bvhPG/Tc911xmEa6C3ZH1nMg4LAD6ympPKVt9/1sMGqYS9CLM1ilHBLYmJsR8NWD/2iKMe8KJo05QX5SsIu87 janreyguyjoco@Janreys-MacBook-Air-2.local
        ~
         */
//        $question = $this->service->findOrFail($serviceId)->questionaires()->findOrFail($questionId);
//        $step = $order($step);//let 2 -1 step = 1
        $questions = $this->service
            ->findOrFail($serviceId)
            ->questionaires()
//            ->whereNot('order', $question->order)
            ->order('order', 'asc')
            ->get();
        return $questions;
//        $
        foreach ($questions as $q)
        {

//            if($q->order == $step)
//            {
//
//            }
        }
//        $data
    }
    public function attach($serviceId, $questionId)
    {

    }

    public function detach($serviceId, $questionId)
    {

    }

}
