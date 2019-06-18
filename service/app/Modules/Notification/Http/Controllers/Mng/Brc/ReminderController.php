<?php

namespace App\Modules\Notification\Http\Controllers\Mng\Brc;

use App\Modules\Notification\Http\Requests\ReminderRequest;
use App\Modules\Notification\Http\Resources\Reminder;
use App\Modules\Notification\Http\Resources\ReminderCollection;
use App\Modules\Notification\Repositories\ReminderRepository;
use App\Modules\Wallet\Services\LoadWalletService;
use App\Notifications\SendSmsNotification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;

class ReminderController extends Controller
{

    protected $reminder;

    protected $apiResponse;

    protected $walletService;

    /**
     * ReminderController constructor.
     *
     * @param reminderRepository $reminder [reminder repo]
     */
    public function __construct(
        ReminderRepository $reminder,
        ApiResponse $apiResponse,
        LoadWalletService $loadWalletService
    )
    {
        $this->reminder = $reminder;
        $this->apiResponse = $apiResponse;
        $this->walletService = $loadWalletService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request)
    {
        $reminders = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->getOrPaginate();
        return $this->apiResponse->resource(new ReminderCollection($reminders));
    }

    /**
     * Show the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $id)
    {
        $reminder = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($id);
        return $this->apiResponse->resource(new Reminder($reminder));
    }

    /**
     * Update the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function update(ReminderRequest $request, $id)
    {
        $payload = $request->only(
            'subject',
            'content',
            'status',
            'has_expiration',
            'expiration_date');

        $reminder = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($id);

        $reminder->update($payload);

        return $this->apiResponse->resource(new Reminder($reminder->fresh()));
    }

    /**
     * Delete the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function delete(Request $request, $id)
    {
        $reminder = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($id);

        $reminder->delete();

        return $this->apiResponse->resource(new Reminder($reminder))->additional([
            'message' => 'You have successfully deleted this reminder.'
        ]);
    }

    /**
     * Store resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function store(ReminderRequest $request)
    {
        $payload = $request->only(
            'subject',
            'content',
            'status',
            'has_expiration',
            'expiration_date');

        $reminder = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->create($payload);
        return $this->apiResponse->resource(new Reminder($reminder))->additional([
            'message' => 'You have successfully created a new reminder.'
        ]);
    }

    /**
     * Send to all members.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function sendAll($id)
    {
        $organization = request()->user()->organization()->firstOrFail();
        $reminder = request()->user()
            ->profile
            ->branch
            ->reminders()
            ->findOrFail($id);
        $branch = $reminder->branch_id;

        if(!$wallet = $this->walletService->checkLoadWallet($organization, $branch))
        {
            return $this->apiResponse->badRequest('Unable to proccess. Your load balance is not enough.');
        }
        $members = $reminder->branch->members;
        foreach ($members as $member)
        {
            $reminder->notify(new SendSmsNotification($member));
        }
        return $this->apiResponse->resource(new Reminder($reminder))->additional([
            'message' => 'Sms notification sent.'
        ]);
    }
}