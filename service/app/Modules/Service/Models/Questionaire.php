<?php

namespace App\Modules\Service\Models;

use App\Modules\Service\Repositories\QuestionaireAnswerRepository;
use App\Modules\Service\Repositories\ServiceRepository;
use OwenIt\Auditing\Auditable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Damnyan\Cmn\Abstracts\AbstractModel as Model;
use Damnyan\Cmn\Traits\Models\CreatorUpdaterTrait;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;

class Questionaire extends Model implements AuditableContract
{
    use Auditable, CreatorUpdaterTrait, SoftDeletes;

    protected $resourceName = 'Questionaire';

    protected $table = 'questionaires';

    public $timestamps = true;

    protected $fillable = [
        'label',
        'field',
        'type',
        'question',
        'help_text',
        'is_required',
        'option'
    ];

    /**
     * Option Transformation
     * @param $value
     */
    public function setOptionAttribute($value)
    {
        $this->attributes['option'] = json_encode($value);
    }

    /**
     * Services Relationship
     *
     * @return string
     */
    public function services()
    {
        return $this->belongsToMany(ServiceRepository::class, 'service_questionaires', 'questionaire_id', 'service_id')
            ->withPivot('order');
    }

    /**
     * User Answer Relationship
     *
     * @return string
     */
    public function answers()
    {
        return $this->hasMany(QuestionaireAnswerRepository::class, 'questionaire_id', 'id');
    }

}
