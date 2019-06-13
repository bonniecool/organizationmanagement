<?php

namespace App\Modules\User\Repositories;

use Carbon\Carbon;
use App\Modules\User\Models\User;
use App\Notifications\ResetPassword;
use App\Notifications\SendActivation;
//use App\Helpers\RandomPasswordGenerator;
//use Illuminate\Support\Facades\Password;
//use App\Notifications\CreatedNewPassword;
//use App\Notifications\SendOrganizationInvitation;
use App\Modules\User\Repositories\SiteUserRepository;

class UserRepository extends User
{
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token->token));
    }

    public static function resetPassword($user)
    {
//        $token = UserTokenRepository::generateResetToken($user);
//        return $token;
    }

    public function resendActivation()
    {
        $token = UserTokenRepository::generateActivationToken($this);

        \Log::info([
            'email' => $this->email,
            'token' => $token
        ]);

        $this->notify(new SendActivation($token->token));
    }

    public function resendPassword()
    {
        $token = UserTokenRepository::generateResetToken($this);

        \Log::info([
            'email' => $this->email,
            'token' => $token
        ]);

        $this->notify(new SendActivation($token->token));
    }

    public function updatePassword($password)
    {
        $this->password = $password;
        return $this->save();
    }

    public function activate()
    {
        $this->activated_at = Carbon::now()->toDateTimeString();
        $this->save();
    }
}
