<?php

namespace App\Modules\Service\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TransactionLogCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $collection = $this->collection;
        return TransactionLog::collection($collection->sortByDesc('created_at'));

    }
}