<?php

namespace App\Modules\Payment\Http\Controllers\Ste;

use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Payment\Services\PaymentService;
use App\Modules\Payment\Http\Requests\PaymentReceiveRequest;

class PaymentController extends Controller
{
    protected $service;
    protected $payment;

    public function __construct(PaymentRepository $payment, PaymentService $service)
    {
        $this->payment = $payment;
        $this->service = $service;
    }

    public function receive(PaymentReceiveRequest $request)
    {
        $payload = $request->only(config('module_payment.requests.ste.received'));

        $payment = $this->payment->where('txnid', $payload['txnid'])->first();
        $transaction = TransactionRepository::where('txnid', $payload['txnid'])->first();
        if ($payment->status == 'S') {
            return ApiResponse::badRequest('This transaction is already paid.');
        }

        if (!$this->service->receive($payment, $payload)) {
            return ApiResponse::badRequest('Failed to receive payment.');
        }
        $transaction->update(['status' => 'PAID']);

        $message = 'Success.';
        return (new ApiResponse())->responseOk($message);
//        if ($payment->status == 'P') {
//            $payment->update(['status' => 'S']);
//            return ApiResponse::responseOk('Sucessfully Paid.');
//        }

        // (new SmsSender)->send(
        //     [
        //         'message' => "Hi {$payment->customer->profile->first_name},\n\nWe have successfully received your payment. \n\nReference No.: {$payment->refno}.\nTotal amount paid: P{$payment->amount}.\n\nThank you and have a nice day.",
        //         'number' => $payment->customer->mobile_number,
        //     ]
        // );
        // $smsData = [
        //     'number' => $payment->customer->mobile_number,
        //     'message' => "Hi {$payment->customer->profile->first_name}, \n\nThank you for paying your bill (Reference no.{$payment->refno}) with an amount of {$payment->amount}."
        // ];

        // event('notification.sms', array($smsData));


    }
}
