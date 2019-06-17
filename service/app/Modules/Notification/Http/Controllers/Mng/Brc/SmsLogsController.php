<?php

namespace App\Modules\Notification\Http\Controllers\Mng\Brc;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Notifications\SendSmsNotification;
use App\Modules\Notification\Models\SmsLog;
use App\Modules\Wallet\Services\LoadWalletService;
use App\Modules\Notification\Repositories\SmsLogRepository;
use App\Modules\Notification\Http\Resources\SmsLogCollection;

class SmsLogsController extends Controller
{

    protected $sms;

    protected $apiResponse;

    protected $walletService;

    /**
     * SmsLogsController constructor.
     *
     * @param SmsLogRepository $sms [sms repo]
     */
    public function __construct(
        SmsLogRepository $sms,
        ApiResponse $apiResponse
    )
    {
        $this->smsLogs = $sms;
        $this->apiResponse = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request)
    {
        $reminderIds = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->pluck('id');

        $smsLogs = $this->smsLogs->whereIn('reminder_id', $reminderIds)
            ->getOrPaginate();

        return $this->apiResponse->resource(new SmsLogCollection($smsLogs));
    }

    /**
     * Show the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $id)
    {
        $smsLogs = $this->smsLogs->findOrFail($id);
    
        return $this->apiResponse->resource(new SmsLog($smsLogs));
    }
}