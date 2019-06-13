<?php

namespace App\Modules\Service\Http\Controllers\Mng\Su;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Product\Repositories\ProductRepository;
use App\Modules\Service\Http\Resources\ServicePackage;
use App\Modules\Service\Repositories\ServiceRepository;
use App\Modules\Service\Http\Resources\ServicePackageCollection;
use App\Modules\Product\Http\Resources\ProductCollection;
use App\Modules\Service\Http\Requests\Mng\Su\ServicePackageRequest;
use App\Modules\Product\Http\Requests\Mng\Su\ProductRequest;

class ServicePackageController extends Controller
{

    protected $service;

    protected $product;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param service     $service     description
     * @param product     $product     description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        ServiceRepository $service,
        ProductRepository $product,
        ApiResponse $apiResponse
    ) {
        $this->product     = $product;
        $this->service     = $service;
        $this->apiResponse = $apiResponse;
    }
    /**
     * service package listing
     *
     * @param integer $serviceId description
     * @return void
     */
    public function index($serviceId)
    {
        $servicePackages = $this->service->findOrFail($serviceId)
            ->packages()
            ->getOrPaginate();

        return $this->apiResponse->resource(new ServicePackageCollection($servicePackages));
    }

    /**
     * service package details
     *
     * @param integer $serviceId description
     * @return void
     */
    public function show($serviceId, $packageId)
    {
        $servicePackage = $this->service->findOrFail($serviceId)
            ->packages()
            ->findOrFail($packageId);

        return $this->apiResponse->resource(new ServicePackage($servicePackage));
    }

    /**
     * create service package
     *
     * @param ServicePackageRequest $request   description
     * @param integer               $serviceId description
     * @return void
     */
    public function store(ServicePackageRequest $request, $serviceId)
    {
        $payload = $request->only('name', 'price', 'description');

        $servicePackage = $this->service->findOrFail($serviceId)
            ->packages()
            ->create($payload);

        $response['data'] = $servicePackage;
        $response['message'] = 'Service Package successfully created.';

        return $this->apiResponse->resource($response);

    }

    /**
     * update service package
     * @param ServicePackageRequest $request   description
     * @param integer               $serviceId description
     * @param integer               $packageId description
     * @return mixed
     */
    public function update(ServicePackageRequest $request, $serviceId, $packageId)
    {
        $payload = $request->only('name', 'price', 'description');

        $servicePackage = $this->service->findOrFail($serviceId)->packages()->findOrFail($packageId);

        $servicePackage->update($payload);

        return (new ApiResponse)->resource(
            (new servicePackage($servicePackage->fresh()))->additional([
                'message' => $servicePackage->getResourceName().' successfully updated.'
            ])
        );
    }

    /**
     * delete service package
     * @param integer $serviceId description
     * @param integer $packageId description
     * @return mixed
     */
    public function delete($serviceId, $packageId)
    {
        $this->service->findOrFail($serviceId)
            ->packages()
            ->findOrFail($packageId);

        $response['message'] = 'Product successfully deleted.';

        return $this->apiResponse->resource($response);
    }

     /**
     * attach product to service package
     * @param integer $serviceId description
     * @param integer $packageId description
     * @param integer $productId description
     * @return mixed
     */
    public function attach($serviceId, $packageId, $productId)
    {
        $package = $this->service
                ->findOrFail($serviceId)
                ->packages()
                ->findOrFail($packageId);

        $product = $package
            ->products()
            ->find($productId);

        if ($product) {
            return $this->apiResponse->badRequest("Product {$product->name} already exist.");
        }

        $package
            ->products()
            ->attach($productId);

        $products = $package
            ->products()
            ->getOrPaginate();

        return $this->apiResponse->resource(new ProductCollection($products))->additional([
            'message' => $package->getResourceName().' product is successfully created.'
        ]);
    }

    /**
     * detach product to service package
     * @param integer $serviceId description
     * @param integer $packageId description
     * @param integer $productId description
     * @return mixed
     */
    public function detach($serviceId, $packageId, $productId)
    {
        $package = $this->service
                ->findOrFail($serviceId)
                ->packages()
                ->findOrFail($packageId);

        $product = $package
            ->products()
            ->find($productId);

        if (!$product) {
            return $this->apiResponse->badRequest("Product {$product->name} already deleted.");
        }

        $package
            ->products()
            ->detach($productId);

        $products = $package
            ->products()
            ->getOrPaginate();

        return $this->apiResponse->resource(new ProductCollection($products))->additional([
            'message' => $package->getResourceName().' product is successfully created.'
        ]);
    }

    /**
     * create attach product to service package
     * @param ProductRequest $request   description
     * @param integer        $serviceId description
     * @param integer        $packageId description
     * @return mixed
     */
    public function createAttach(ProductRequest $request, $serviceId, $packageId)
    {
        $payload = $request->only('name', 'description');

        $product = $this->product->create($payload);

        $package = $this->service
                ->findOrFail($serviceId)
                ->packages()
                ->findOrFail($packageId);

        $package
            ->products()
            ->attach($product);

        $products = $package
            ->products()
            ->getOrPaginate();

        return $this->apiResponse->resource(new ProductCollection($products))->additional([
            'message' => $package->getResourceName().' product is successfully created.'
        ]);
    }

}
