<?php

namespace App\Modules\Transaction\Repositories;

use App\Modules\Service\Repositories\QuestionaireAnswerRepository;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Transaction\Models\Transaction;
use App\Modules\Transaction\Services\TransactionIdGenerator;
use Illuminate\Support\Facades\DB;


class TransactionRepository extends Transaction
{

    /**
     * scope create transaction
     * @param $data array
     * @return transaction
     */

    public static function createTransaction($data, $service)
    {
        $profile = request()->user()->profile;
        $transactionService = new TransactionIdGenerator();
        $payload = [
            'txnid' => $transactionService->generate(),
            'amount' => $service->price,
            'status' => 'PENDING'//DRAFT'
        ];
        return DB::transaction(function() use($payload, $data, $service, $profile){
            $transaction = self::create($payload);
            $transaction->service()->associate($service)->save();
            $transaction->profile()->associate($profile)->save();
            if($service->is_multiple_package)
            {
                foreach ($data['package_id'] as $item)
                {
                    $transaction->transactionItems()->create(['package_id' => $item]);
                }
                return $transaction;
            }

            $transaction->transactionItems()->create($data);
            return $transaction;
        });
    }

    public static function resubmitTransaction($data, $service, $transactionId)
    {
        return DB::transaction(function() use($data, $service, $transactionId){
            $profile = request()->user()->profile;
            $transaction = $service->transactions()->findOrFail($transactionId);
            if(!is_null($data)) {
                $transaction = QuestionaireAnswerRepository::updateAnswers($data, $transaction, $profile);
            }
            return $transaction;
        });
    }

    public static function pendingTransaction($service, $transaction, $data)
    {
        $profile = $transaction->profile;
        if(!is_null($data)) {
            QuestionaireAnswerRepository::createAnswers($data, $transaction, $profile);
        }
        $tickets = TransactionTicketRepository::createTicket($service, $transaction, $profile);
        $transaction->update(['status' => 'PENDING', 'is_editable' => 0]);

        return $transaction;
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && !is_null($filters['status'])) {
            $query = $query->where('status', $filters['status']);
        }

        if (isset($filters['keyword']) && !is_null($filters['keyword'])) {
            $siteUserId = SiteUserRepository::where('first_name', 'LIKE', '%'. $filters['keyword'] .'%')
                ->orWhere('middle_name', 'LIKE', '%'. $filters['keyword'] .'%')
                ->orWhere('last_name', 'LIKE', '%'. $filters['keyword'] .'%')
                ->pluck('id');

            $query = $query->whereIn('profile_site_user_id', $siteUserId);
        }

        if (isset($filters['service']) && !is_null($filters['service'])) {
            $serviceId = ServiceRepository::where('name', 'LIKE', '%'. $filters['service'] .'%')
                ->pluck('id');

            $query = $query->whereIn('service_id', $serviceId);
        }

        return $query;
    }
}
