<?php

namespace App\Modules\Service\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class QuestionaireAnswer extends Resource
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
            'id' => $this->questionaire->id,
            'label' => $this->questionaire->label,
            'field' => $this->questionaire->field,
            'type' => $this->questionaire->type,
            'question' => $this->questionaire->question,
            'answer' => $this->answer,
        ];
    }
}