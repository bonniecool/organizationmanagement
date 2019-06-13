<?php

namespace App\Modules\Transaction\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use App\Modules\Service\Http\Resources\QuestionaireAnswerCollection;
use App\Modules\Service\Http\Resources\QuestionaireCollection;
use App\Modules\Service\Http\Resources\Service;
use App\Modules\Service\Http\Resources\StageCollection;
use App\Modules\Service\Http\Resources\TransactionLogCollection;
use Carbon\Carbon;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class Transaction extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->profile->user,
            'service_name' => $this->service->name,
            'service_description' => $this->service->description,
            'service_questionaires' => new QuestionaireAnswerCollection($this->questionaireAnswers),
            'stages' => $this->stages,
            'amount' => $this->amount,
            'status' => $this->status,
            'is_editable' => $this->is_editable,
            'remarks' => $this->remarks,
            'is_notify' => $this->status == 'RESUBMIT' ? 1 : 0,
            'transaction_logs' => new TransactionLogCollection($this->transactionLogs),
            'payment' => $this->payment,
            'created_at_readable' => $this->created_at_readable,
            'created_ago' => $this->created_ago,
            'updated_at_readable' => $this->updated_at_readable,
            'updated_ago' => $this->updated_ago,
        ];
    }
}

