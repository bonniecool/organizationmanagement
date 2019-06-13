<?php

namespace App\Modules\Service\Models;

use OwenIt\Auditing\Auditable;
use App\Modules\Service\Traits\PivotOrderTrait;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class ServiceQuestionaire extends Model implements AuditableContract
{
    use Auditable, PivotOrderTrait;

    protected $resourceName = 'Service Questionaires';

    protected $table = 'service_questionaires';

    public $timestamps = true;

    protected $fillable = [
        'order',
    ];

    public function setServiceIdAttribute($value){

    }
}