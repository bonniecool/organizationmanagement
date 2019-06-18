<?php

namespace App\Modules\Wallet\Http\Controllers\Mng;

use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Wallet\Http\Requests\LoadWalletRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Payment\Services\PaymentService;

class LoadWalletController extends Controller
{
    protected $service;
    protected $payment;
    protected $apiResponse;

    public function __construct(
        PaymentRepository $payment,
        PaymentService $service,
        ApiResponse $apiResponse)
    {
        $this->payment = $payment;
        $this->service = $service;
        $this->apiResponse = $apiResponse;
    }

    public function loadWallet(LoadWalletRequest $request)
    {
        $payload = $request->only('amount', 'refno', 'txnid');
        $organization = request()->user()->organization()->firstOrFail();
        if(!$payment = $this->service->process($organization, $payload))
        {
            return $this->apiResponse->badRequest('Transaction cannot be processed. Please contact the administrator.');
        }

        return $this->apiResponse->resource([
            'data' => $payment,
            'message' => 'Please pay the load amount reference number.'
        ]);
    }




    public function pgiLoad(LoadWalletRequest $request)
    {
        $payload = $request->only('amount');
        $organization = request()->user()->organization()->firstOrFail();

        if(!$payment = $this->service->processViaPgi($organization, $payload))
        {
            return $this->apiResponse->badRequest('Transaction cannot be processed. Please contact the administrator.');
        }

        return $this->apiResponse->resource([
            'data' => $payment
        ]);
    }

}
