<?php

namespace App\Modules\User\Repositories;

use App\Modules\User\Models\Administrator;

class AdministratorRepository extends Administrator
{
    public static function createProfile($data)
    {
        $profile = self::create($data);
        $profile->user()->create($data);
        return $profile;
    }

    public function updateProfile($data)
    {
        $this->update($data);
        $this->user->update($data);
        return $this->fresh();
    }
}
