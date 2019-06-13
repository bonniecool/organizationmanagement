<?php

namespace App\Modules\User\Repositories;

use App\Modules\User\Models\SuperAdmin;

class SuperAdminRepository extends SuperAdmin
{
    public static function createProfile($data)
    {
        $profile = self::create($data);
        $profile->user()
            ->create($data);

        return $profile->user;
    }

    public function updateProfile($data)
    {
        $this->update($data);
        $this->user->update($data);
        return $this->user;
    }
}
