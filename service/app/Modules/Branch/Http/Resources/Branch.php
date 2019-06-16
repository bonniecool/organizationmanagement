<?php

namespace App\Modules\Branch\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class branch extends Resource
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
            'organization_id' => $this->organization_id,
            'uuid' => $this->uuid,
            'name' => $this->name,
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
            'longitude' => $this->longitude,
            'latitude' => $this->latitude,
            'is_active' => $this->is_active
        ];
    }
}
