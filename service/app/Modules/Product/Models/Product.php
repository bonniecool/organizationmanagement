<?php

namespace App\Modules\Product\Models;

use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Product extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Products';

    protected $table = 'products';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'description'
    ];

    /**
     * product Relationship
     *
     * @return string
     */
    public function package()
    {
        return $this->belongsTo(ServicePackageRepository::class, 'package_products', 'service_package_id', 'product_id');
    }
}
