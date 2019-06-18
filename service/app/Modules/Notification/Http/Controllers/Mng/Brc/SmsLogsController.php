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
use App\Modules\Notification\Http\Resources\SmsLog as SmsLogResource;

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
    public function index(Request $request, $reminderId)
    {
        $smsLogs = request()
            ->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($reminderId)
            ->smsLogs()
            ->getOrPaginate();

        return $this->apiResponse->resource(new SmsLogCollection($smsLogs));
    }

    /**
     * Show the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $reminderId, $smsLogsId)
    {
        $smsLogs = request()
            ->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($reminderId)
            ->smsLogs()
            ->findOrFail($smsLogsId);
    
        return $this->apiResponse->resource(new SmsLogResource($smsLogs));
    }
}