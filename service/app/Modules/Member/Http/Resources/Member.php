<?php

namespace App\Modules\Member\Http\Resources;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class Member extends Resource
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
            'uuid' => $this->uuid,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date,
            'suffix' => $this->suffix,
            'mobile_number' => $this->mobile_number,
            'user_type' => $this->user_type,
            'photo' => $this->photo,
            'region' => $this->region,
            'province' => $this->province,
            'municipality' => $this->municipality,
            'barangay' => $this->barangay,
            'zip_code' => $this->zip_code,
            'street' => $this->street,
            'longitude' => $this->longitude,
            'latitude' => $this->latitude,
            'has_logged' => $this->has_logged,
            'mac_address' => $this->mac_address
        ];
    }
}
