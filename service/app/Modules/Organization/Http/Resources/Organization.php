<?php

namespace App\Modules\Organization\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Organization extends Resource
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
            'uuid' => $this->uuid,
            'name' => $this->name,
            'region_code' => $this->region_code,
            'province_code' => $this->province_code,
            'municipality_code' => $this->municipality_code,
            'barangay_code' => $this->barangay_code,
            'zip_code' => $this->zip_code,
            'street' => $this->street,
            'load_wallet' => $this->whenLoaded('loadWallet')
        ];
    }
}
