<?php

namespace App\Modules\Common\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modules\Common\Models\Region;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Common\Models\Barangay;
use App\Modules\Common\Models\Province;
use App\Modules\Common\Models\Municipality;

class AddressController extends Controller
{
    protected $apiResponse;

    /**
     * AddressController constructor.
     * 
     */
    public function __construct(
        ApiResponse $apiResponse
    )
    {
        $this->apiResponse = $apiResponse;
    }

    /**
     * Display a listing of regions.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function regionList()
    {
        $regions = Region::get();

        $response['data'] = $regions;
        return $this->apiResponse->resource($response);
    }

    /**
     * Display a listing of provinces.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function provinceList($regionCode)
    {
        $provinces = Province::where('region_code', $regionCode)
            ->get();

        $response['data'] = $provinces;
        return $this->apiResponse->resource($response);
    }

     /**
     * Display a listing of municipalities.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function municipalityList($regionCode, $provinceCode)
    {
        $municipality = Municipality::where('region_code', $regionCode)
            ->where('province_code', $provinceCode)
            ->get();

        $response['data'] = $municipality;
        return $this->apiResponse->resource($response);
    }

     /**
     * Display a listing of barangays.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function barangayList($regionCode, $provinceCode, $municipalityCode)
    {
        $barangay = Barangay::where('region_code', $regionCode)
            ->where('province_code', $provinceCode)
            ->where('municipality_code', $municipalityCode)
            ->get();

        $response['data'] = $barangay;
        return $this->apiResponse->resource($response);
    }
}