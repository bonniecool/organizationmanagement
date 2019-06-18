<?php

namespace App\Modules\Payment\Http\Controllers;

use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Payment\Services\PaymentService;
use App\Modules\Payment\Http\Requests\PaymentReceiveRequest;

class PaymentController extends Controller
{
    protected $service;

    protected $payment;

    protected $apiResponse;

    public function __construct(
        PaymentRepository $payment,
        PaymentService $service,
        ApiResponse $apiResponse
    )
    {
        $this->payment = $payment;
        $this->service = $service;
        $this->apiResponse = $apiResponse;
    }

    public function receive(PaymentReceiveRequest $request)
    {
//        $payload = $request->only(config('module_payment.requests.ste.received'));
        $payload = $request->only([
            'txnid',
            'refno',
            'status',
            'digest',
            'message',
            'payment_channel'
        ]);

        $payment = $this->payment->where('txnid', $payload['txnid'])->firstOrFail();

        if ($payment->status == 'S') {
            return $this->apiResponse->badRequest('This transaction is already paid.');
        }

        if(!$this->service->receive($payment, $payload))
        {
            return $this->apiResponse->badRequest('Failed to receive payment.');
        }

        if(!$this->service->replenishLoad($payment, $payload))
        {
            return $this->apiResponse->badRequest('Failed to receive payment.');
        }

        return $this->apiResponse->responseOk('Payment successfully received.');
    }
}
