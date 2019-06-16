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
            'oganization_owner' => $this->organization_owner,
            'mobile_number' => $this->mobile_number,
            'region_code' => $this->region_code,
            'region_name' => optional($this->region)->name,
            'province_code' => $this->province_code,
            'provice_name' => optional($this->province)->name,
            'municipality_code' => $this->municipality_code,
            'municipality_name' => optional($this->municipality)->name,
            'barangay_code' => $this->barangay_code,
            'barangay_name' => optional($this->barangay)->name,
            'zip_code' => $this->zip_code,
            'street' => $this->street,
        ];
    }
}
