<?php

namespace App\Modules\User\Validators;

use Carbon\Carbon;


class AgeValidator
{
    public function validateMinor($attribute, $value, $parameters, $validator)
    {
        $birthDate = request()->get($parameters[0]);
        $ageLimit = request()->get($parameters[1]);

        $age = Carbon::now()->format('Y') - Carbon::parse($birthDate)->format('Y');

        if ($age < $parameters[1] && !$value) {
            return false;
        }

        return true;
    }

    public function messageReplacer($validator, $customMessage)
    {
        $validator->addReplacer('validate_minor', function ($message, $attribute, $rule, $parameters) use ($customMessage) {
            return str_replace($message, $customMessage, $message);
        });
    }
}
