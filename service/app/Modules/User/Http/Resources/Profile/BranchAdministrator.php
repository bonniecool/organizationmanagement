<?php

namespace App\Modules\User\Http\Resources\Profile;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;

class BranchAdministrator extends Resource
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
            'profile_id' => $this->id,
            'photo' => $this->photo,
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'mobile_number' => $this->mobile_number,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date,
            'is_active' => $this->is_active
        ];
    }
}
