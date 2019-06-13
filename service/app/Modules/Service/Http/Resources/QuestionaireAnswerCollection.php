<?php

namespace App\Modules\Service\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResourceCollection as ResourceCollection;

class QuestionaireAnswerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return QuestionaireAnswer::collection($this->collection);
    }
}
