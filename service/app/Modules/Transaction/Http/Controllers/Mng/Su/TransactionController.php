<?php

namespace App\Modules\Transaction\Http\Controllers\Mng\Su;

use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Transaction\Repositories\TransactionTicketRepository;
use App\Modules\Transaction\Http\Resources\TransactionCollection;
use App\Modules\Transaction\Http\Resources\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Damnyan\Cmn\Services\ApiResponse;
use Illuminate\Support\Facades\DB;

class TransactionController
{

    protected $transaction;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Stage       $stage       description
     * @param Group       $group       description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        TransactionRepository $transaction,
        ApiResponse $apiResponse
    ) {
        $this->transaction = $transaction;
        $this->apiResponse = $apiResponse;
    }

    /**
     * Undocumented function
     *
     * @return [list of groups]
     */
    public function index(Request $request)
    {
        $params = $request->only('keyword', 'status', 'service');

        $transactions = $this->transaction
            ->filter($params)
            ->getOrPaginate();

       return $this->apiResponse->resource(new TransactionCollection($transactions));
    }

    /**
     * Undocumented function
     *
     * @return [list of groups]
     */
    public function show($transactionId)
    {
        $transaction = $this->transaction->findOrFail($transactionId);

       return $this->apiResponse->resource(new Transaction($transaction));
    }
}