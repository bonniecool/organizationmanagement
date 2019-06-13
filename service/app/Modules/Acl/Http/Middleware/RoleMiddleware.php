<?php

namespace App\Modules\Acl\Http\Middleware;

use Closure;
use JWTAuth;
use Illuminate\Routing\Router;
use Damnyan\Cmn\Services\ApiResponse;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class RoleMiddleware
{
    protected $router;

    /**
     * Create a new middleware instance
     *
     * @param \Illuminate\Routing\Router $router
     *
     * @return void
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next, $permission)
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return (new ApiResponse)->forbidden('Invalid token.');
            }
            
            if (!$user->is_organization_admin) {
                if (!$user->can(
                    $permission,
                    $this->router
                        ->current()
                        ->parameters()
                )) {
                    return (new ApiResponse)->forbidden('Access denied.');
                }
            }
        } catch (JWTException $e) {
            if ($e instanceof TokenExpiredException) {
                return (new ApiResponse)->forbidden('Token expired.');
            }

            return (new ApiResponse)->forbidden('Invalid token.');
        }

        return $next($request);
    }
}
