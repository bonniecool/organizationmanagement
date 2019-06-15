<?php

namespace App\Modules\Member\Repositories;

use App\Modules\Member\Models\Member;

class MemberRepository extends Member
{
    public static function findUuid($value)
    {
        return self::where('uuid', $value);
    }

}
