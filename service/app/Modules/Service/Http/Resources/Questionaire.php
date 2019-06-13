<?php

namespace App\Modules\Service\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class Questionaire extends Resource
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
            'label' => $this->label,
            'field' =>$this->field,
            'is_required' =>$this->is_required,
            'type' => $this->type,
            'question' => $this->question,
            'help_text' => $this->help_text,
            'option' => $this->option,
        ];
    }
}

