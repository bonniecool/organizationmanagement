<?php

namespace App\Modules\Transaction\Http\Controllers\Mng;

use App\Modules\Payment\Services\PaymentService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Damnyan\Cmn\Services\ApiResponse;
use App\Notifications\SendUserEmailNotification;
use App\Notifications\SendAdminEmailNotification;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Service\Repositories\EmailContentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use App\Modules\Transaction\Repositories\TransactionTicketRepository;
use App\Modules\Transaction\Http\Resources\TransactionTicket;
use App\Modules\Transaction\Http\Resources\TransactionTicketCollection;
use App\Modules\Transaction\Http\Requests\EmailContentRequest;


class TransactionTicketController
{

    protected $transaction;

    protected $apiResponse;

    protected $user;

    protected $stage;

    protected $emailContent;

    /**
     * __construct
     *
     * @param Stage       $stage       description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        TransactionTicketRepository $transaction,
        UserRepository $user,
        StageRepository $stage,
        EmailContentRepository $emailContent,
        PaymentService $paymentService,
        ApiResponse $apiResponse
    ) {
        $this->ticket       = $transaction;
        $this->user         = $user;
        $this->stage        = $stage;
        $this->emailContent = $emailContent;
        $this->paymentService = $paymentService;
        $this->apiResponse  = $apiResponse;
    }
    /**
     * Transaction ticket list per group
     *
     * @param Request $request [request]
     * @return [list of groups]
     */
    public function index(Request $request)
    {
        $stage = $request
            ->user()
            ->profile
            ->group()
            ->firstOrFail()
            ->stage()
            ->firstOrFail();
        $transactionTickets = $stage
            ->transactionTickets()
            ->whereHas('ticketOrigin', function($query){
                return $query->where('status', 'APPROVED');
            })
            ->orWhere(function($query) use($stage){
                return $query->where('ticket_origin', 0)->where('stage_id', $stage->id);
            })
            ->getOrPaginate();

        return $this->apiResponse->resource(new TransactionTicketCollection($transactionTickets));
    }

    /**
     * Transaction ticket details
     *
     * @param Request $request  [request]
     * @param int     $ticketId [ticket id]
     * @return [list of groups]
     */
    public function show(Request $request, $ticketId)
    {
        $transactionTicket = $this->ticket->findOrFail($ticketId);

        return $this->apiResponse->resource(new TransactionTicket($transactionTicket));
    }

    /**
     * Process transaction ticket
     *
     * @param Request $request  [request]
     * @param int     $ticketId [ticket id]
     * @return [list of groups]
     */
    public function process(Request $request, $ticketId)
    {
        $processorId = $request
            ->user()
            ->profile
            ->id;

        $transactionTicket = $this->ticket->findOrFail($ticketId);
        $transaction       = $transactionTicket->transaction;

        if ($transactionTicket->status == 'PROCESSING') {
            return $this->apiResponse->badRequest('This transaction ticket is already processing.');
            //This transaction ticket has already been submitted to customer. Waiting for compliance.');
        }

        if ($transaction->status == 'RESUBMIT') {
            return $this->apiResponse->badRequest('Processing failed. Waiting for customer compliance');
            //This transaction ticket has already been submitted to customer. Waiting for compliance.');
        }

        $origin = optional($transactionTicket->ticketOrigin)->status;

        if (!is_null($origin) && $origin != 'APPROVED') {
            return $this->apiResponse->badRequest('Processing failed. Preceding stage must be approved.');
            //This transaction ticket cannot be processed until the preceding stage is approved.');
        }

        $transactionTicket->update(['status' => 'PROCESSING', 'processor_id' => $processorId]);

        return $this->apiResponse->resource(new TransactionTicket($transactionTicket));
    }

    /**
     * Approve transaction ticket
     *
     * @param Request $request  [request]
     * @param int     $ticketId [ticket id]
     * @return [list of groups]
     */
    public function approve(EmailContentRequest $request, $ticketId)
    {
        $payload = $request->only('subject', 'message');

        $processorProfile = request()->user()->profile;

        $transactionTicket = $this->ticket->findOrFail($ticketId);

        if ($transactionTicket->transaction->status == 'RESUBMIT') {
            return $this->apiResponse->badRequest('This transaction ticket has already been submitted to customer. Waiting for compliance.');
        }

        if ($transactionTicket->status == 'APPROVED') {
            return $this->apiResponse->badRequest('This transaction ticket has already been approved.');
        }

        if ($transactionTicket->transaction->status == 'FOR PAYMENT')
        {
            return $this->apiResponse->badRequest('This transaction is waiting for payment.');
        }

        if($nextStage = $transactionTicket->ticketRecipient()->first())
        {
            if($nextStage->stage->for_payment)
            {
                if(!$payment = $this->paymentService->process($nextStage->transaction))
                {
                    return $this->apiResponse->badRequest('Failed to generate payment.');
                }
            }
        }

        $action = $transactionTicket->update(['status' => 'APPROVED', 'processor_id' => $processorProfile->id, 'remarks' => $payload['message']]);


        if($action){
            self::notifyNextStage($transactionTicket, $payload);
        }

        return $this->apiResponse->resource(new TransactionTicket($transactionTicket));
    }

    public function notifyNextStage($transactionTicket, $payload)
    {
        $nextTicket = $transactionTicket->ticketRecipient()->first();
        if($nextTicket){
            $administrators = $nextTicket
                ->stage
                ->group()
                ->firstOrFail()
                ->administrators()
                ->get();
            $adminRecipients = $administrators ? $administrators->pluck('user') : null;
            if(!is_null($adminRecipients))
            {
                $emailContent = $transactionTicket->stage()
                    ->firstOrFail()
                    ->emailContent()
                    ->first();
                if(!is_null($emailContent))
                {
                    foreach ($adminRecipients as $admin)
                    {
                        $data = ['subject' => $emailContent->subject, 'message' => $emailContent->body];
                        $admin->notify(new SendAdminEmailNotification($data));
                    }
                }
            }
        }
        $transactionTicket->profile->user->notify(new SendUserEmailNotification($payload));
        return;
    }

    /**
     * Reject transaction ticket
     *
     * @param Request $request  [request]
     * @param int     $ticketId [ticket id]
     * @return [list of groups]
     */
    public function reject(EmailContentRequest $request, $ticketId)
    {
        $payload = $request->only('subject', 'message');

        $processorProfile = request()->user()->profile;

        $transactionTicket = $this->ticket->findOrFail($ticketId);

        if ($transactionTicket->transaction->status == 'RESUBMIT') {
            return $this->apiResponse->badRequest('This transaction ticket has already been submitted to customer. Waiting for compliance.');
        }

        if ($transactionTicket->transaction->status == 'APPROVED') {
            return $this->apiResponse->badRequest('This transaction ticket has already been approved.');
        }

        $action = $transactionTicket->update(['status' => 'DISAPPROVED', 'processor_id' => $processorProfile->id]);

        if($action){
            $transactionTicket->transaction()->update(['status' => 'DISAPPROVED']);
            self::notifyNextStage($transactionTicket, $payload);
        }

        return $this->apiResponse->resource(new TransactionTicket($transactionTicket));
    }

    /**
     * Reject transaction ticket
     *
     * @param Request $request  [request]
     * @param int     $ticketId [ticket id]
     * @return [list of groups]
     */
    public function resubmit(EmailContentRequest $request, $ticketId)
    {
        $payload = $request->only('subject', 'message');

        $processorId = $request
            ->user()
            ->profile
            ->id;

        $transactionTicket = $this->ticket->findOrFail($ticketId);
        $transaction       = $transactionTicket->transaction;

        if ($transaction->status == 'RESUBMIT') {
            return $this->apiResponse->badRequest('This transaction ticket has already been submitted to customer. Waiting for compliance.');
        }

        $userId = $transactionTicket->profile_site_user_id;

        $user = $this->user->where('profile_type', 'SiteUser')
            ->where('profile_id', $userId)
            ->firstOrFail();

        $transaction->update(
            [
                'status' => 'RESUBMIT',
                'is_editable' => 1,
                'remarks' => '[WAITING FOR CUSTOMER COMPLIANCE]'
            ]
        );
        $transactionTicket->update(
            [
                'remarks' => '[WAITING FOR CUSTOMER COMPLIANCE]',
                'status' => 'RESUBMIT'
            ]
        );

        $user->notify(new SendUserEmailNotification($payload));

        return $this->apiResponse->resource(new TransactionTicket($transactionTicket));
    }
}