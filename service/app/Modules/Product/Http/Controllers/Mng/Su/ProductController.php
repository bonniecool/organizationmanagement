<?php

namespace App\Modules\Product\Http\Controllers\Mng\Su;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Product\Repositories\ProductRepository;
use App\Modules\Product\Http\Requests\Mng\Su\ProductRequest;
use App\Modules\Product\Http\Resources\Product;
use App\Modules\Product\Http\Resources\ProductCollection;


class ProductController extends controller
{

    protected $product;

    protected $apiResponse;

    /**
     * __construct
     *
     * @param Product     product      description
     * @param Group       $group       description
     * @param ApiResponse $apiResponse description
     */
    public function __construct(
        ProductRepository $product,
        ApiResponse $apiResponse
    ) {
        $this->product     = $product;
        $this->apiResponse = $apiResponse;
    }
    /**
     * Product Listing
     *
     * @return [list of groups]
     */
    public function index()
    {
        $products = $this->product->getOrPaginate();

        return $this->apiResponse->resource(new ProductCollection($products));
    }

    /**
     * Product Details
     *
     * @param [type] $productId [product id]
     * @return [selected product details]
     */
    public function show($productId)
    {
        $product = $this->product->findOrFail($productId);
        return $this->apiResponse->resource(new Product($product));
    }

    /**
     * Create Product
     *
     * @param ProductRequest $request [request]
     * @return [add product]
     */
    public function store(ProductRequest $request)
    {
        $payload = $request->only('name', 'description');

        $product = $this->product->create($payload);

        $response['data'] = $product;
        $response['message'] = 'Product successfully created.';

        return $this->apiResponse->resource($response);
    }

    /**
     * Update Product
     *
     * @param ProductRequest $request [request]
     * @return [add product]
     */
    public function update(ProductRequest $request, $productId)
    {
        $payload = $request->only('name', 'description');

        $product = $this->product->findOrFail($productId);

        $product->update($payload);

        return (new ApiResponse)->resource(
            (new Product($product->fresh()))->additional([
                'message' => $product->getResourceName().' successfully updated.'
            ])
        );
    }

    /**
     * Delete Product
     *
     * @param ProductRequest $request [request]
     * @return [add product]
     */
    public function delete($productId)
    {
        $this->product->findOrFail($productId)->delete();

        $response['message'] = 'Product successfully deleted.';

        return $this->apiResponse->resource($response);
    }


}