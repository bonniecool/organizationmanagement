<?php

namespace App\Modules\Service\Http\Requests\Ste;

use App\Modules\Service\Repositories\ServiceRepository;
use Damnyan\Cmn\Abstracts\ApiRequest;
use Illuminate\Support\Collection;

class PurchaseServiceRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * Array validation must accept
     * [
     *      question.*.id
     *      question.*.name
     *      question.*.answer
     * ]
     * @return array
     */
    public function rules()
    {
        $service = ServiceRepository::findOrFail($this->serviceId);
        $questionaires = $service->questionaires()->get();
        $data = [];
        foreach ($questionaires as $key => $question)
        {
            $rule = $question['is_required'] ? 'required' : '';
            $data[$question['field']] = $rule;
        }
        return $data;
    }
}
