<?php

namespace App\Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\User\Http\Requests\ForgotPasswordRequest;
use App\Modules\User\Http\Requests\ResetPasswordRequest;
use App\Modules\User\Http\Requests\UpdatePasswordRequest;
use App\Modules\User\Repositories\UserRepository as User;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\User\Repositories\UserTokenRepository;
use Carbon\Carbon;
use Damnyan\Cmn\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    /**
     * Update current logged in user's password
     * @param UpdatePasswordRequest $request
     * @return \Damnyan\Cmn\Services\ApiResponse
     */
    public function update(UpdatePasswordRequest $request)
    {
        $data = $request->only('current_password', 'new_password');

        $user = request()->user();

        $user->updatePassword($data['new_password']);

        return (new ApiResponse)->responseOK('Password changed.');
    }

    public function forgot(ForgotPasswordRequest $request)
    {
        $data = $request->only('email');
        $user = UserRepository::whereEmail($data['email'])->firstOrFail();
        $token = UserTokenRepository::generateResetToken($user);
        $user->sendPasswordResetNotification($token);

        return (new ApiResponse)->responseOK('Password reset link sent to your email.');


//
//        $response = $this->broker()->sendResetLink(
//            $request->only('email')
//        );
//        return $response == Password::RESET_LINK_SENT
//        ? (new ApiResponse)->responseOK(trans($response))
//        : (new ApiResponse)->badRequest(trans($response));
    }

    public function reset(ResetPasswordRequest $request)
    {
        $data = $request->only('email', 'token', 'password', 'password_confirmation');
        $user = UserRepository::whereEmail($data['email'])->firstOrFail();
        $token = UserTokenRepository::findToken($data['token'], 'PASSWORD_RESET');

        if (!$this->validateTokenExpiration($token)) {
            return (new ApiResponse)->badRequest('Failed to process your request. please click the resend activation button.');
        }

        if (!$user->updatePassword($data['password']))
        {
            return (new ApiResponse)->badRequest('Something went wrong.');
        }

        return (new ApiResponse)->responseOk('Password updated.');
//        $response = $this->broker()->reset(
//            $data,
//            function ($user, $password) use($data){
//                $user->updatePassword($password);
//            }
//        );
//        return $response == Password::PASSWORD_RESET
//        ? (new ApiResponse)-App\Modules\Service\Http\Controllers\Ste\ServiceController
//        : (new ApiResponse)->badRequest(trans($response));
    }

    private function validateTokenExpiration($token)
    {
        $user = $token->user;
        if ($token->expiration_date < Carbon::now()) {
            $user->resendPassword();
            return false;
        }
        $token->delete();
        return true;
    }
}
