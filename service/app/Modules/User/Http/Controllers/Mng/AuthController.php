<?php

namespace App\Modules\User\Http\Controllers\Mng;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Lang;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\User\Http\Requests\AuthRequest;
use Damnyan\Cmn\Exceptions\BadRequestException;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use App\Modules\User\Http\Resources\Auth as AuthResource;

class AuthController extends Controller
{
    use ThrottlesLogins;

    /**
     * @param AuthRequest $request
     * @return mixed
     * @throws BadRequestException
     */
    public function login(AuthRequest $request)
    {
        $data = $request->only('email', 'password');
        if ($lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            $seconds = $this->limiter()->availableIn(
                $this->throttleKey($request)
            );

            throw new BadRequestException(Lang::get('auth.throttle', ['seconds' => $seconds]));
        }

        try {
            if (! $token = JWTAuth::attempt($data)) {
                $this->incrementLoginAttempts($request);
                throw new BadRequestException('Invalid credentials.');
            }
        } catch (JWTException $e) {
                throw new BadRequestException($e->getMessage());
        }
        if (!in_array(request()->user()->profile_type, config('module_user.mng_login'))) {
            throw new BadRequestException('Invalid credentials.');
        }

        $response = collect([
            'token' => $token,
            'user' => request()->user()
        ]);

        return (new ApiResponse)->resource(new AuthResource($response));
    }

    public function username()
    {
        return 'email';
    }

    public function logout(Request $request)
    {
        if (JWTAuth::invalidate(JWTAuth::getToken())) {
            return (new ApiResponse)->responseOk('You have successfully logged out.');
        }
        return (new ApiResponse)->badRequest('Failed to process your request. Please try again later.');
    }
}
