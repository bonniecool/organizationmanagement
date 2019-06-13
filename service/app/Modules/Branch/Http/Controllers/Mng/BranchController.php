<?php

namespace App\Modules\Branch\Http\Controllers\Mng;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index(Request $request)
    {
        $branches = $request
            ->user()
            ->organization
            ->branches()
            ->getOrPaginate();

        return $branches;

        // return (new ApiResponse)->resource(new ModuleCollection($modules));
    }
}
