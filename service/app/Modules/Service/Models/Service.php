<?php

namespace App\Modules\Service\Models;

use App\Modules\Service\Repositories\QuestionaireRepository;
use App\Modules\Service\Repositories\ServicePackageRepository;
use App\Modules\Service\Repositories\StageRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Service extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Services';

    protected $table = 'services';

    public $timestamps = true;

    protected $fillable = [
        'name',
        'price',
        'image',
        'description',
        'is_multiple_package',
        'is_active'
    ];

    protected $with = ['questionaires', 'stages'];

    public function setNameAttribute($value)
    {
        $this->attributes['code'] = str_slug($value);
        $this->attributes['name'] = $value;
    }
    /**
     * Questionaires Relationship
     *
     * @return string
     */
    public function questionaires()
    {
        return $this->belongsToMany(QuestionaireRepository::class, 'service_questionaires', 'service_id', 'questionaire_id')
            ->withPivot('order');
    }

    /**
     * Stages Relationship
     *
     * @return string
     */
    public function stages()
    {
        return $this->hasMany(StageRepository::class, 'service_id');
    }

    /**
     * Transactions Relationship
     *
     * @return string
     */
    public function transactions()
    {
        return $this->hasMany(TransactionRepository::class, 'service_id');
    }

    /**
     * package Relationship
     *
     * @return string
     */
    public function packages()
    {
        return $this->hasMany(ServicePackageRepository::class, 'service_id');
    }
}