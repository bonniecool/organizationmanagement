<?php

namespace App\Modules\Dashboard\Http\Controllers\Ste;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;

class DashboardController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Damnyan\Cmn\Services\ApiResponse
    */
    public function message(Request $request)
    {
        $organization  = request()->user()->organization;
        $messages = $organization->messages()->filter($request)->aggregation('day')->get();
        return (new ApiResponse)->resource($messages);
    }
}
