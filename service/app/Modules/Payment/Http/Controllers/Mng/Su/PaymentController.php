<?php

namespace App\Modules\Payment\Http\Controllers\Mng\Su;

use App\Modules\Payment\Http\Resources\Payment;
use App\Modules\Payment\Http\Resources\PaymentCollection;
use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $payment;

    protected $apiResponse;

    public function __construct(
        PaymentRepository $payment,
        ApiResponse $apiResponse
    )
    {
        $this->payment = $payment;
        $this->apiResponse = $apiResponse;
    }

    public function index(Request $request)
    {
        $params = $request->only('refno', 'date_from', 'date_to', 'status', 'keyword', 'uuid');
        $payments = $this->payment->filter($params)->getOrPaginate();
        return $this->apiResponse->resource(new PaymentCollection($payments));
    }

    public function show($txnid)
    {
        $myPayment = request()->user()
            ->organization
            ->payments()
            ->whereTxnid($txnid)
            ->firstOrFail();
        return $this->apiResponse->resource(new Payment($myPayment));
    }
}
