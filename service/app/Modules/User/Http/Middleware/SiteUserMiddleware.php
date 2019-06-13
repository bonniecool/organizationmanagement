<?php

namespace App\Modules\User\Http\Middleware;

use Closure;
use Damnyan\Cmn\Services\ApiResponse;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class SiteUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try
        {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return (new ApiResponse)->forbidden('Invalid token.');
            }
        } catch (JWTException $e) {
            if ($e instanceof TokenExpiredException) {
                return (new ApiResponse)->forbidden('Token Expired');
            }
            return (new ApiResponse)->forbidden('Invalid token.');
        }

        if ($user->profile_type != config('module_user.constants.user_types.siteuser')) {
            return (new ApiResponse)->forbidden();
        }

        if (!$user->activated_at) {
            return (new ApiResponse)->forbidden('Account not activated.');
        }

        return $next($request);
    }
}
