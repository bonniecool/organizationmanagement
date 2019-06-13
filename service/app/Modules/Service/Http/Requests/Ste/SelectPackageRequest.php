<?php

namespace App\Modules\Service\Http\Requests\Ste;

use App\Modules\Service\Repositories\ServiceRepository;
use Damnyan\Cmn\Abstracts\ApiRequest;

class SelectPackageRequest extends ApiRequest
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

        if(!$service->is_multiple_package)
        {
            return [
                'package_id' => 'required|exists:service_packages,id'
            ];
        }

        return [
            'package_id' => 'required|array',
            'package_id.*' => 'required|exists:service_packages,id'
        ];
    }
}
