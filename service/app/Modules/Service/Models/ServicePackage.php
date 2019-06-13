<?php

namespace App\Modules\Service\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use App\Modules\Product\Repositories\ProductRepository;

class ServicePackage extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Service Packages';

    protected $table = 'service_packages';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'description',
        'price'
    ];

    /**
     * Service Relationship
     *
     * @return string
     */
    public function service()
    {
        return $this->belongsTo(ServiceRepository::class, 'service_id');
    }

    /**
     * product Relationship
     *
     * @return string
     */
    public function products()
    {
        return $this->belongsToMany(ProductRepository::class, 'package_products', 'service_package_id', 'product_id');
    }
}
