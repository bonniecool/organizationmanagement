<?php

namespace App\Modules\Service\Http\Controllers\Ste;

use App\Http\Controllers\Controller;
use App\Modules\Service\Http\Requests\Ste\PurchaseServiceRequest;
use App\Modules\Service\Http\Requests\Ste\SelectPackageRequest;
use App\Modules\Transaction\Http\Resources\Transaction;
use App\Modules\Transaction\Http\Resources\TransactionCollection;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Http\Resources\ServiceCollection;
use App\Modules\Service\Http\Resources\ServiceQuestionaire;


use App\Modules\Service\Http\Requests\Mng\Su\ServiceRequest;
use App\Modules\Service\Http\Resources\Service as ServiceResource;
use Tymon\JWTAuth\Contracts\Providers\Auth;

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
        $service = $this->service->findOrFail($serviceId)
            ->load('questionaires');
        return $this->apiResponse->resource(new ServiceResource($service));
    }

    /**
     * initial service draft
     *
     * @return void
     */
    public function initial(SelectPackageRequest $request, $serviceId)
    {
        $service = $this->service->findOrFail($serviceId);
//        $fields = $service->questionaires()->pluck('field')->toArray();
//        $data = $request->only($fields);
        $data = $request->only('package_id');
        if(!request()->user()->completed_profile)
        {
            return $this->apiResponse->badRequest('Please complete your profile first.');
        }

        $transaction = TransactionRepository::createTransaction($data, $service);


//        $transId = $transaction->id;//temp pagisahin init pending
//        self::pending($serviceId, $transId);//temp pagisahin init pending

        return $this->apiResponse->resource(new Transaction($transaction))->additional([
            'message' => $transaction->getResourceName().' successfully created.'
        ]);
    }

    /**
     * pending service pending
     *  @params $serviceId, $transactionId
     * @return void
     */
    public function pending(PurchaseServiceRequest $request, $serviceId, $transactionId)
    {
        $service = $this->service->findOrFail($serviceId);
        $fields = $service->questionaires()->pluck('field')->toArray();
        $data = $request->only($fields);
        $transaction = $service->transactions()->findOrFail($transactionId);
        if(!request()->user()->completed_profile)
        {
            return $this->apiResponse->badRequest('Please complete your profile first.');
        }
        if(!$transaction->pendingTransaction($service, $transaction, $data))
        {
            return $this->apiResponse->badRequest('Something went wrong.');
        }

        return $this->apiResponse->resource(new Transaction($transaction->fresh()))
            ->additional([
                'message' => $transaction->getResourceName().' successfully submitted.'
            ]);
    }

    /**
     * resubmit service pending
     *  @params $serviceId, $transactionId
     * @return void
     */
    public function resubmit(PurchaseServiceRequest $request, $serviceId, $transactionId)
    {
        $service = $this->service->findOrFail($serviceId);
        $fields = $service->questionaires()->pluck('field')->toArray();
        $data = $request->only($fields);

        $transaction = $service->transactions()->findOrFail($transactionId);
        if(!$transaction->is_editable)
        {
            return $this->apiResponse->badRequest('Update of service request is not allowed.');
        }

        if($transaction->status != 'RESUBMIT')
        {
            return $this->apiResponse->badRequest('Update of service is not required.');
        }

        if(!$questionaire = TransactionRepository::resubmitTransaction($data, $service, $transactionId))
        {
            return $this->apiResponse->badRequest('Something went wrong.');
        }
        $transaction->status = 'PENDING';
        $transaction->is_editable = 0;
        $transaction->save();
        return $this->apiResponse->responseOk('Questionaire successfully updated.');
    }


    /**
     * list all my transaction (not per service)
     * @params $serviceId
     * @return void
     */
    public function myTransactions()
    {
        $transactions = request()->user()->profile->transactions()->latest('updated_at')->getOrPaginate();
        return $this->apiResponse->resource(new TransactionCollection($transactions));
    }

    /**
     * show my transaction (not per service)
     * @params $serviceId
     * @return void
     */
    public function myTransaction($transId)
    {
        $transaction = request()->user()->profile->transactions()->findOrFail($transId);
        return $this->apiResponse->resource(new Transaction($transaction));
    }

    /**
     * list all transaction per service
     * @params $serviceId
     * @return void
     */
    public function listServiceTransactions($serviceId)
    {
        $service = $this->service->findOrFail($serviceId);
        $transactions = $service->transactions()->order('updated_at', 'desc')->getOrPaginate();

        return $this->apiResponse->resource(new TransactionCollection($transactions));
    }

    /**
     * show service transaction per service
     * @params $serviceId, $transactionId
     * @return void
     */
    public function showServiceTransaction($serviceId, $transactionId)
    {
        $service = $this->service->findOrFail($serviceId);
        $transaction = $service->transactions()->findOrFail($transactionId);
        return $this->apiResponse->resource(new Transaction($transaction));
    }

    /**
     * index serviceQuestionaire
     *
     * @return void
     */
    public function serviceQuestionaire($serviceId)
    {
        $service = $this->service->findOrFail($serviceId);

        return $this->apiResponse->resource(new ServiceQuestionaire($service));
    }
}
