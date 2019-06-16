<?php

namespace App\Modules\Payment\Http\Controllers\Mng;

use App\Modules\Payment\Http\Resources\Payment;
use App\Modules\Payment\Http\Resources\PaymentCollection;
use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Payment\Services\PaymentService;
use App\Modules\Payment\Http\Requests\PaymentReceiveRequest;

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
        $params = $request->only('refno', 'date_from', 'date_to', 'status', 'keyword');
        $myPayments = request()->user()->organization->payments()->filter($params)->getOrPaginate();
        return $this->apiResponse->resource(new PaymentCollection($myPayments));
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
