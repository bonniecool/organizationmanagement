<?php

namespace App\Modules\User\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Repositories\UserRepository;
use App\Modules\User\Repositories\UserTokenRepository;
use App\Modules\User\Http\Requests\AccoutActivationRequest;
use App\Modules\User\Http\Requests\ResendActivationCodeRequest;

class AccountActivationController extends Controller
{
    /**
    * Activate account.
    *
    * @return \Damnyan\Cmn\Services\ApiResponse
    */
    public function activate(AccoutActivationRequest $request)
    {
        $payload = $request->only('token');
        $token = UserTokenRepository::findToken($payload['token'], 'ACTIVATION');
        
        if (!$this->validateTokenExpiration($token)) {
            // return redirect(config('app.site_url'). 'resend_activation');
            return (new ApiResponse)->badRequest('Failed to process your request. please click the resend activation button.');
        }

        // return redirect(config('app.site_url').'/sign-in');
        return (new ApiResponse)->responseOk('Account activate.');
    }


    /**
    * Resend Activation code.
    *
    * @return \Damnyan\Cmn\Services\ApiResponse
    */
    public function resendCode(ResendActivationCodeRequest $request)
    {
        $payload = $request->only('email');
        $user = UserRepository::whereEmail($payload['email'])->firstOrFail();
        $user->resendActivation();

        // return redirect(config('app.site_url').'/sign-in');
        return (new ApiResponse)->responseOk('Your new activation code has been sent to your email');
    }


    private function validateTokenExpiration($token)
    {
        $user = $token->user;
        if ($token->expiration_date < Carbon::now()) {
            $user->resendActivation();
            return false;
        }

        $user->activate();
        $token->delete();
        return true;
    }
}
