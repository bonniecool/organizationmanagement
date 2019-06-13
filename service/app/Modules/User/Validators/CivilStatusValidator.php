<?php

namespace App\Modules\User\Validators;

use Carbon\Carbon;


class CivilStatusValidator
{
    public function validateCivilStatus($attribute, $value, $parameters, $validator)
    {
        $civilStatus = request()->get($parameters[0]);

        if (in_array($civilStatus, ['MARRIED', 'WIDOWED', 'ANNULLED', 'SEPARATED'])) {
            return false;
        }

        return true;
    }

    public function messageReplacer($validator, $customMessage)
    {
        $validator->addReplacer('validate_civil_status', function ($message, $attribute, $rule, $parameters) use ($customMessage) {
            return str_replace($message, $customMessage, $message);
        });
    }
}
