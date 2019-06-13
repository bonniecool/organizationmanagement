<?php

namespace App\Modules\Service\Models;


use App\Modules\Service\Repositories\StageRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class EmailContent extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Email content';

    protected $table = 'email_contents';

    public $timestamps = true;

    protected $fillable = [
        'subject',
        'body',
        'signature',
    ];

    /**
     * Services Relationship
     *
     * @return string
     */
    public function stage()
    {
        return $this->belongsTo(StageRepository::class, 'stage_id');
    }
}
