<?php

namespace App\Modules\User\Repositories;

use App\Modules\User\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Modules\User\Models\SiteUser;
use App\Notifications\SendActivation;
use App\Modules\User\Repositories\UserRepository;
use App\Notifications\SendOrganizationInvitation;
use App\Modules\User\Repositories\UserTokenRepository;
use App\Modules\Organization\Repositories\OrganizationRepository;

class SiteUserRepository extends SiteUser
{
    /**
     * create profile
     *
     * @param array $data description
     * @return void
     */
    public static function createProfile($data)
    {
        DB::beginTransaction();
            $organization = OrganizationRepository::createOrganization($data);
            $data['organization_id'] = $organization->id;
            $data['is_organization_admin'] = isset($data['is_organization_admin'])
                ?? $data['is_organization_admin'];
            $profile = self::create($data);
            $user    = $profile->user()->create($data);
            $token   = UserTokenRepository::generateActivationToken($user);
        DB::commit();

        $user->notify(new SendActivation($token->token));
        return $user;
    }

    /**
     * create Organization profile
     *
     * @param array $data description
     * @return void
     */
    public static function createOrganizationUser($organization, $data)
    {
        DB::beginTransaction();
            $data['organization_id'] = $organization->id;
            $data['password'] = self::generatePassword(8);

            $profile = self::create($data);
            $user    = $profile->user()->create($data);
            $token   = UserTokenRepository::generateActivationToken($user);
        DB::commit();
        $user->notify(new SendOrganizationInvitation($data['password'], $token->token));
        return $user;
    }

    /**
     * update profile
     *
     * @param array $data description
     * @return void
     */
    public function updateProfile($data)
    {
        $this->update($data);
        $this->user->update($data);
        return $this->user;
    }

    private static function generatePassword($len) {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < $len; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }
}
