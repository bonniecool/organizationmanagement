<?php

namespace App\Modules\User\Http\Resources;

use App\Modules\Branch\Http\Resources\Branch;
use App\Modules\Organization\Http\Resources\Organization;
use Damnyan\Cmn\Abstracts\AbstractResource as Resource;
use App\Modules\Organization\Http\Resources\Organization as OrganizationResource;

class User extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        //user
        $profile = 'App\\Modules\\User\\Http\\Resources\\Profile\\'.$this->user->profile_type;
        return [
            'id' => $this->id,
            'profile_type' => $this->user->profile_type,
            'email' => $this->user->email,
            'profile' => new $profile($this->user->profile),
            'organization_id' => $this->user->organization_id,
            'organization_name' => optional($this->user->organization)->name,
            'load_wallet' => optional($this->user->organization)->loadWallet
        ];
    }
}
