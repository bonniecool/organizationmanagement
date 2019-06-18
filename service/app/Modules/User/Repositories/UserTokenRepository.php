<?php

namespace App\Modules\User\Repositories;

use Carbon\Carbon;
use App\Modules\User\Models\UserToken;

class UserTokenRepository extends UserToken
{
    /**
     * Verify the token provided
     * @param  string $token
     * @param  string $type
     * @return boolean
     */
    public function verify($token, $accountType, $tokenType)
    {

        $query = $this->where('token', $token)
        ->where('account_type', $accountType)
        ->where('token_type', $tokenType)
        ->count();

        if ($query > 0) {
            return true;
        }

        return false;
    }

    /**
     * Verify the token provided
     * @param  string $token
     * @param  string $type
     * @return boolean
     */
    public static function findToken($token, $tokenType ,$accountType = null)
    {
        $query = self::where('token', $token)
            ->where('token_type', $tokenType);

        if ($accountType) {
            $query = $query->where('token_type', $tokenType);
        }

        return $query->firstOrFail();
    }

    /**
     * Get the email by using the token provided
     * @param  string $token
     * @param  string $type
     * @return integer
     */
    public function getEmailByToken($token, $accountType, $tokenType)
    {
        $query = $this->model->where('token', $token)
        ->where('account_type', $accountType)
        ->where('token_type', $tokenType)
        ->value('email');

        return $query;
    }

    /**
     * Delete a specific resource in the model by "token"
     *
     * @param  string $token
     * @return boolean
     */
    public function removeToken($token, $accountType, $tokenType)
    {
        $query = $this->model->where('token', $token)
        ->where('account_type', $accountType)
        ->where('token_type', $tokenType)
        ->first();

        return $query->delete();
    }

    public static function generateActivationToken($user)
    {
        $token = self::whereEmail($user->email)
            ->whereAccountType($user->profile_type)
            ->whereTokenType('activation')
            ->first();
        if ($token) {
            $token->delete();
        }
        return $user->tokens()->create(
            [
                'email' => $user->email,
                'token' => self::generatetoken(),
                'account_type' => $user->profile_type,
                'token_type' => 'ACTIVATION',
                'expiration_date' => carbon::now()->addminutes(10)
            ]
        );
    }

    public static function generateResetToken($user)
    {
        $token = self::whereEmail($user->email)
            ->whereAccountType($user->profile_type)
            ->whereTokenType('password_reset')
            ->first();
        if ($token) {
            $token->delete();
        }
        return $user->tokens()->create(
            [
                'email' => $user->email,
                'token' => self::generatetoken(),
                'account_type' => $user->profile_type,
                'token_type' => 'PASSWORD_RESET',
                'expiration_date' => carbon::now()->addminutes(10)
            ]
        );
    }

    public static function generateOTP($user)
    {
        $token = self::whereEmail($user->email)
            ->whereAccountType($user->profile_type)
            ->whereTokenType('OTP')
            ->first();

        if ($token) {
            $token->delete();
        }
        return $user->tokens()->create(
            [
                'email' => $user->email,
                'token' => self::generateOTPToken(6),
                'account_type' => $user->profile_type,
                'token_type' => 'OTP',
                'expiration_date' => Carbon::now()->addDays(1)
            ]
        );
    }

    private static function generateToken($length = 40)
    {   
        return hash_hmac('sha256', str_random($length), config('app.key'));
    }
    
    private static function generateOTPToken($length = 6)
    {   
        return sprintf('%06d', rand(0,999999));
    }    
}
