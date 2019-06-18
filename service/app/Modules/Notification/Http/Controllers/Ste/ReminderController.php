<?php

namespace App\Modules\Notification\Http\Controllers\Ste;

use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Notification\Http\Resources\ReminderCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Notification\Repositories\SmsLogRepository;
use Illuminate\Support\Facades\Hash;

class ReminderController extends Controller
{

    protected $memberRepository;

    protected $apiResponse;

    /**
     * ReminderController constructor.
     *
     * @param SmsLogRepository $sms [sms repo]
     */
    public function __construct(
        MemberRepository $member,
        ApiResponse $apiResponse
    )
    {
        $this->memberRepository = $member;
        $this->apiResponse = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request, $uuid)
    {
        $pin = $request->header('pin');
        if(is_null($request->header('pin')))
        {
            return $this->apiResponse->forbidden('Unauthorized access.');
        }

        $member = $this->memberRepository
            ->findUuid($uuid)
            ->firstOrFail();

        if(!Hash::check($pin, $member->pin))
        {
            return $this->apiResponse->badRequest('Incorrect Pin.');
        }

        $reminders = $member
            ->branch
            ->reminders()
            ->whereStatus(1)
            ->orderBy('id', 'DESC')
            ->getOrPaginate();

        return $this->apiResponse->resource(new ReminderCollection($reminders));
    }
}