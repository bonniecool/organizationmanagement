<?php

namespace App\Modules\Service\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class Service extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $questionaire = $this->whenLoaded('questionaires');
        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'description' => $this->description,
            'is_multiple_package' => $this->is_multiple_package,
            'is_active' => $this->is_active,
            'questionaire' => new QuestionaireCollection($questionaire)
        ];
    }
}