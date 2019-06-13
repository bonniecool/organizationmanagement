<?php

namespace App\Modules\Transaction\Repositories;

use App\Modules\Transaction\Models\TransactionTicket;
use Illuminate\Support\Facades\DB;

class TransactionTicketRepository extends TransactionTicket
{
    /**
     * scope create transaction tickets
     * @param $data array
     * @return transaction tickets
     */

    public static function createTicket($service, $transaction, $profile)
    {
        $stages = $service->stages()->orderBy('order', 'asc')->get();

        $origin = 0;

        if($stages)
        {
            foreach ($stages as $stage)
            {

                $ticket = $transaction->stages()->create([
                    'transaction_id' => $transaction->id,
                    'profile_site_user_id' => $profile->id,
                    'service_id' => $service->id,
                    'stage_id' => $stage->id,
                    'ticket_origin' => $origin,
                    'status' => 'OPEN'
                ]);

                $origin = $ticket->id;
//                $transaction->stages()->firstOrCreate([
//                    'transaction_id' => $transaction->id,
//                    'profile_site_user_id' => $profile->id,
//                    'service_id' => $service->id,
//                    'stage_id' => $stage->id
//                ], [
//                    'ticket_origin' => $origin,
//                    'status' => 'OPEN'
//                ]);
            }
        }
        return $transaction->tickets;
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['status']) && !is_null($filters['status'])) {
            $query = $query->where('status', $filters['status']);
        }

        return $query;
    }
}
