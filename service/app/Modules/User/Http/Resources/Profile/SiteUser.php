<?php

namespace App\Modules\User\Http\Resources\Profile;

use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class SiteUser extends Resource
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
            'photo' => $this->photo,
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'middle_name' => $this->middle_name,
            'last_name' => $this->last_name,
            'organization_name' => optional($this->organization)->name,
            'is_organization_admin' => $this->is_organization_admin,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date
        ];
    }
}
