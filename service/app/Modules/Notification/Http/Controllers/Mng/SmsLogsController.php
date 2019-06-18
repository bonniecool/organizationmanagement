<?php

namespace App\Modules\Notification\Http\Controllers\Mng;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Notifications\SendSmsNotification;
use App\Modules\Notification\Models\SmsLog;
use App\Modules\Wallet\Services\LoadWalletService;
use App\Modules\Notification\Repositories\SmsLogRepository;
use App\Modules\Notification\Http\Resources\SmsLogCollection;
use App\Modules\Notification\Http\Resources\SmsLog as SmsLogResource;
use App\Modules\Notification\Repositories\ReminderRepository;

class SmsLogsController extends Controller
{

    protected $sms;

    protected $reminder;

    protected $apiResponse;

    /**
     * SmsLogsController constructor.
     *
     * @param SmsLogRepository $sms [sms repo]
     */
    public function __construct(
        SmsLogRepository $sms,
        ReminderRepository $reminder,
        ApiResponse $apiResponse
    )
    {
        $this->smsLogs = $sms;
        $this->reminder = $reminder;
        $this->apiResponse = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request, $reminderId)
    {
        $branchIds = request()->user()
            ->organization
            ->branches()
            ->pluck('id');
        
        $smsLogs = $this->reminder->whereIn('branch_id', $branchIds)
            ->findOrFail($reminderId)->smsLogs()->getOrPaginate();

        return $this->apiResponse->resource(new SmsLogCollection($smsLogs));
    }

    /**
     * Show the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $reminderId, $smsLogsId)
    {
        $branchIds = request()->user()
            ->organization
            ->branches()
            ->pluck('id');
        
        $smsLogs = $this->reminder->whereIn('branch_id', $branchIds)
            ->findOrFail($reminderId)->smsLogs()->findOrFail($smsLogsId);
    
        return $this->apiResponse->resource(new SmsLogResource($smsLogs));
    }
}